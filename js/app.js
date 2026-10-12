/**
 * Ice & Fire Restaurant - Main Application Logic
 * Quetta, Pakistan
 */

(function () {
  "use strict";

  // Application State
  const state = {
    menuItems: [],
    restaurantInfo: {},
    activeCategory: "all",
    searchQuery: "",
    selectedTag: "all",
    sortBy: "default",
    cart: [],
    selectedSizes: {}, // itemId -> 'full' | 'half'
    activeScanIndex: 0
  };

  // DOM Elements
  const elements = {
    categoryList: document.getElementById("categoryList"),
    menuGrid: document.getElementById("menuGrid"),
    menuCount: document.getElementById("menuCount"),
    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    sortSelect: document.getElementById("sortSelect"),
    dietFilter: document.getElementById("dietFilter"),
    cartBtn: document.getElementById("cartBtn"),
    cartCountBadge: document.getElementById("cartCountBadge"),
    cartDrawer: document.getElementById("cartDrawer"),
    cartBackdrop: document.getElementById("cartBackdrop"),
    cartCloseBtn: document.getElementById("cartCloseBtn"),
    cartItemsWrap: document.getElementById("cartItemsWrap"),
    cartSubtotal: document.getElementById("cartSubtotal"),
    cartDelivery: document.getElementById("cartDelivery"),
    cartTotal: document.getElementById("cartTotal"),
    deliveryThresholdWrap: document.getElementById("deliveryThresholdWrap"),
    deliveryProgressFill: document.getElementById("deliveryProgressFill"),
    amountNeededText: document.getElementById("amountNeededText"),
    checkoutBtnWhatsApp: document.getElementById("checkoutBtnWhatsApp"),
    custName: document.getElementById("custName"),
    custPhone: document.getElementById("custPhone"),
    custAddress: document.getElementById("custAddress"),
    custNotes: document.getElementById("custNotes"),
    reservationForm: document.getElementById("reservationForm"),
    lightboxModal: document.getElementById("lightboxModal"),
    lightboxImg: document.getElementById("lightboxImg"),
    lightboxTitle: document.getElementById("lightboxTitle"),
    lightboxClose: document.getElementById("lightboxClose"),
    lightboxTabs: document.getElementById("lightboxTabs"),
    mobileNavToggle: document.getElementById("mobileNavToggle"),
    navLinks: document.getElementById("navLinks"),
    toastContainer: document.getElementById("toastContainer")
  };

  // Initialize App
  function init() {
    loadData();
    loadCartFromStorage();
    renderCategories();
    renderMenuItems();
    setupEventListeners();
    setupLightbox();
    updateCartUI();
  }

  // Load Database Items
  function loadData() {
    if (window.IceFireDB) {
      state.menuItems = window.IceFireDB.getMenuItems();
      state.restaurantInfo = window.IceFireDB.getRestaurantInfo();
    }
  }

  // Render Category Navigation
  function renderCategories() {
    if (!elements.categoryList || !window.IceFireDB) return;
    const cats = window.IceFireDB.DEFAULT_CATEGORIES;

    elements.categoryList.innerHTML = cats
      .map((cat) => {
        const isActive = cat.id === state.activeCategory ? "active" : "";
        return `
          <button class="cat-btn ${isActive}" data-category="${cat.id}">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </button>
        `;
      })
      .join("");
  }

  // Filter & Sort Items
  function getFilteredItems() {
    let items = [...state.menuItems];

    // Filter by Category
    if (state.activeCategory !== "all") {
      items = items.filter((item) => item.category === state.activeCategory);
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== "") {
      const q = state.searchQuery.toLowerCase().trim();
      items = items.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const urduMatch = item.urdu && item.urdu.includes(q);
        const descMatch = item.description && item.description.toLowerCase().includes(q);
        const numMatch = String(item.num).toLowerCase().includes(q);
        return nameMatch || urduMatch || descMatch || numMatch;
      });
    }

    // Filter by Tag / Vibe
    if (state.selectedTag !== "all") {
      if (state.selectedTag === "fire") {
        items = items.filter((item) => (item.badge && item.badge.includes("🔥")) || item.category === "burger" || item.category === "sandwich");
      } else if (state.selectedTag === "ice") {
        items = items.filter((item) => (item.badge && item.badge.includes("❄️")) || item.category.includes("ice") || item.category.includes("shake") || item.category.includes("juice") || item.category.includes("mocktail") || item.category.includes("margarita"));
      } else if (state.selectedTag === "special") {
        items = items.filter((item) => (item.badge && (item.badge.includes("⭐") || item.badge.includes("Bestseller"))));
      }
    }

    // Sort Items
    if (state.sortBy === "price-low") {
      items.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === "price-high") {
      items.sort((a, b) => b.price - a.price);
    } else if (state.sortBy === "name") {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  }

  // Render Menu Grid
  function renderMenuItems() {
    if (!elements.menuGrid) return;
    const items = getFilteredItems();

    if (elements.menuCount) {
      elements.menuCount.textContent = `Showing ${items.length} delicious ${items.length === 1 ? "dish" : "dishes"}`;
    }

    if (items.length === 0) {
      elements.menuGrid.innerHTML = `
        <div class="no-results-state">
          <h3>No dishes found matching your search</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">Try adjusting your keyword or selecting "All Dishes"</p>
          <button class="btn btn-ice btn-sm" id="btnResetFilters" style="margin-top: 16px;">View All Dishes</button>
        </div>
      `;
      const resetBtn = document.getElementById("btnResetFilters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.activeCategory = "all";
          state.searchQuery = "";
          state.selectedTag = "all";
          if (elements.searchInput) elements.searchInput.value = "";
          renderCategories();
          renderMenuItems();
        });
      }
      return;
    }

    elements.menuGrid.innerHTML = items
      .map((item) => {
        const isOutOfStock = !item.inStock;
        const currentSize = state.selectedSizes[item.id] || "full";
        const currentPrice = currentSize === "half" && item.halfPrice ? item.halfPrice : item.price;
        const isIceItem = item.category.includes("ice") || item.category.includes("mocktail") || item.category.includes("juice") || item.category.includes("margarita") || (item.badge && item.badge.includes("❄️"));

        return `
          <div class="dish-card ${isOutOfStock ? "out-of-stock" : ""}" data-id="${item.id}">
            <div class="dish-img-wrap">
              <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'" />
              <div class="dish-num-badge">#${item.num}</div>
              ${item.badge ? `<div class="dish-tag-badge ${isIceItem ? "ice-tag" : ""}">${item.badge}</div>` : ""}
            </div>
            <div class="dish-body">
              <div class="dish-title-row">
                <h4 class="dish-title">${item.name}</h4>
                <span class="dish-urdu">${item.urdu || ""}</span>
              </div>
              <p class="dish-desc">${item.description || ""}</p>

              ${
                item.hasSizes
                  ? `
                  <div class="dish-size-selector" data-id="${item.id}">
                    <button type="button" class="size-pill ${currentSize === "full" ? "active" : ""}" data-size="full">
                      ${item.category === "handmade-icecream" ? "1 Litre" : "Full"}: Rs. ${item.price}
                    </button>
                    <button type="button" class="size-pill ${currentSize === "half" ? "active" : ""}" data-size="half">
                      ${item.category === "handmade-icecream" ? "500 ml" : "Half"}: Rs. ${item.halfPrice}
                    </button>
                  </div>
                `
                  : ""
              }

              <div class="dish-footer">
                <div class="dish-price-wrap">
                  <span class="dish-price-label">Price in PKR</span>
                  <div class="dish-price">
                    <span class="currency">Rs.</span>
                    <span class="amount" id="price-${item.id}">${currentPrice}</span>
                  </div>
                </div>

                ${
                  isOutOfStock
                    ? `<span class="badge badge-cancelled">Sold Out</span>`
                    : `
                  <button type="button" class="btn-add-cart" data-id="${item.id}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
                    <span>Add</span>
                  </button>
                `
                }
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Category pill click
    if (elements.categoryList) {
      elements.categoryList.addEventListener("click", (e) => {
        const btn = e.target.closest(".cat-btn");
        if (!btn) return;
        state.activeCategory = btn.dataset.category;
        renderCategories();
        renderMenuItems();
      });
    }

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        if (elements.searchClear) {
          if (state.searchQuery.length > 0) {
            elements.searchClear.classList.add("visible");
          } else {
            elements.searchClear.classList.remove("visible");
          }
        }
        renderMenuItems();
      });
    }

    if (elements.searchClear) {
      elements.searchClear.addEventListener("click", () => {
        elements.searchInput.value = "";
        state.searchQuery = "";
        elements.searchClear.classList.remove("visible");
        renderMenuItems();
      });
    }

    // Sort select
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener("change", (e) => {
        state.sortBy = e.target.value;
        renderMenuItems();
      });
    }

    // Diet filter
    if (elements.dietFilter) {
      elements.dietFilter.addEventListener("change", (e) => {
        state.selectedTag = e.target.value;
        renderMenuItems();
      });
    }

    // Menu Grid interactions (Size selection & Add to Cart)
    if (elements.menuGrid) {
      elements.menuGrid.addEventListener("click", (e) => {
        // Size selector pill
        const sizePill = e.target.closest(".size-pill");
        if (sizePill) {
          const sizeSelector = sizePill.closest(".dish-size-selector");
          const itemId = sizeSelector.dataset.id;
          const size = sizePill.dataset.size;
          state.selectedSizes[itemId] = size;

          // Update active style in DOM
          sizeSelector.querySelectorAll(".size-pill").forEach((p) => p.classList.remove("active"));
          sizePill.classList.add("active");

          // Update displayed price
          const item = state.menuItems.find((it) => it.id === itemId);
          if (item) {
            const priceEl = document.getElementById(`price-${item.id}`);
            if (priceEl) {
              priceEl.textContent = size === "half" ? item.halfPrice : item.price;
            }
          }
          return;
        }

        // Add to cart button
        const addBtn = e.target.closest(".btn-add-cart");
        if (addBtn) {
          const itemId = addBtn.dataset.id;
          const item = state.menuItems.find((it) => it.id === itemId);
          if (item) {
            const selectedSize = state.selectedSizes[item.id] || "full";
            addToCart(item, selectedSize);
          }
        }
      });
    }

    // Cart Drawer Open/Close
    if (elements.cartBtn) {
      elements.cartBtn.addEventListener("click", openCart);
    }
    const floatingBtn = document.getElementById("floatingCartBtn");
    if (floatingBtn) {
      floatingBtn.addEventListener("click", openCart);
    }
    if (elements.cartCloseBtn) {
      elements.cartCloseBtn.addEventListener("click", closeCart);
    }
    if (elements.cartBackdrop) {
      elements.cartBackdrop.addEventListener("click", closeCart);
    }

    // Cart Drawer items +/- click
    if (elements.cartItemsWrap) {
      elements.cartItemsWrap.addEventListener("click", (e) => {
        const qtyBtn = e.target.closest(".qty-btn");
        if (qtyBtn) {
          const index = parseInt(qtyBtn.dataset.index, 10);
          const delta = parseInt(qtyBtn.dataset.delta, 10);
          updateCartQuantity(index, delta);
          return;
        }

        const removeBtn = e.target.closest(".btn-remove-cart");
        if (removeBtn) {
          const index = parseInt(removeBtn.dataset.index, 10);
          removeFromCart(index);
        }
      });
    }

    // WhatsApp Checkout Form
    if (elements.checkoutBtnWhatsApp) {
      elements.checkoutBtnWhatsApp.addEventListener("click", handleWhatsAppCheckout);
    }

    // Table Reservation Form Submission
    if (elements.reservationForm) {
      elements.reservationForm.addEventListener("submit", handleReservationSubmit);
    }

    // Mobile Navigation Toggle
    if (elements.mobileNavToggle && elements.navLinks) {
      elements.mobileNavToggle.addEventListener("click", () => {
        elements.navLinks.classList.toggle("mobile-open");
      });
    }

    // Scans click in original menu section
    document.querySelectorAll(".scan-card").forEach((card) => {
      card.addEventListener("click", () => {
        const index = parseInt(card.dataset.index, 10) || 0;
        openLightbox(index);
      });
    });

    const openScanModalBtn = document.getElementById("openScanModalBtn");
    if (openScanModalBtn) {
      openScanModalBtn.addEventListener("click", () => openLightbox(0));
    }

    const btnScansQuick = document.getElementById("btnScansQuick");
    if (btnScansQuick) {
      btnScansQuick.addEventListener("click", () => openLightbox(0));
    }
  }

  // --- CART MANAGEMENT ---
  function addToCart(item, size) {
    const isHalf = size === "half" && item.halfPrice;
    const unitPrice = isHalf ? item.halfPrice : item.price;
    const sizeLabel = item.hasSizes ? (size === "half" ? (item.category === "handmade-icecream" ? "500ml" : "Half") : (item.category === "handmade-icecream" ? "1 Litre" : "Full")) : "";

    const cartItemKey = `${item.id}-${size}`;
    const existingIndex = state.cart.findIndex((c) => c.key === cartItemKey);

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        key: cartItemKey,
        id: item.id,
        num: item.num,
        name: item.name,
        urdu: item.urdu || "",
        category: item.category,
        image: item.image,
        unitPrice: unitPrice,
        sizeLabel: sizeLabel,
        quantity: 1
      });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`Added "${item.name}" to cart! 🛒`);
  }

  function updateCartQuantity(index, delta) {
    if (!state.cart[index]) return;
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
    saveCartToStorage();
    updateCartUI();
  }

  function removeFromCart(index) {
    if (!state.cart[index]) return;
    const removedName = state.cart[index].name;
    state.cart.splice(index, 1);
    saveCartToStorage();
    updateCartUI();
    showToast(`Removed "${removedName}" from cart`);
  }

  function openCart() {
    if (elements.cartDrawer) elements.cartDrawer.classList.add("active");
    if (elements.cartBackdrop) elements.cartBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    if (elements.cartDrawer) elements.cartDrawer.classList.remove("active");
    if (elements.cartBackdrop) elements.cartBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update Badges
    if (elements.cartCountBadge) {
      elements.cartCountBadge.textContent = totalItems;
      elements.cartCountBadge.style.display = totalItems > 0 ? "flex" : "none";
    }
    const floatingBadge = document.getElementById("floatingCartBadge");
    if (floatingBadge) {
      floatingBadge.textContent = totalItems;
      floatingBadge.style.display = totalItems > 0 ? "flex" : "none";
    }

    // Render Cart Items
    if (!elements.cartItemsWrap) return;

    if (state.cart.length === 0) {
      elements.cartItemsWrap.innerHTML = `
        <div class="cart-empty-state">
          <div class="icon">🛍️</div>
          <h4 style="color: #ffffff; margin-bottom: 6px;">Your cart is empty</h4>
          <p style="font-size: 0.85rem;">Discover our authentic Ice & Fire dishes and add items to begin ordering!</p>
        </div>
      `;
      if (elements.cartSubtotal) elements.cartSubtotal.textContent = "Rs. 0";
      if (elements.cartDelivery) elements.cartDelivery.textContent = "Rs. 0";
      if (elements.cartTotal) elements.cartTotal.textContent = "Rs. 0";
      if (elements.deliveryProgressFill) elements.deliveryProgressFill.style.width = "0%";
      if (elements.amountNeededText) elements.amountNeededText.textContent = "Min Rs. 1000 for FREE Delivery";
      return;
    }

    elements.cartItemsWrap.innerHTML = state.cart
      .map((item, index) => {
        return `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <h5 class="cart-item-title">${item.name}</h5>
            ${item.sizeLabel ? `<span class="cart-item-size-badge">${item.sizeLabel}</span>` : ""}
            <span class="cart-item-price">Rs. ${item.unitPrice * item.quantity}</span>
            <div class="cart-item-controls">
              <button type="button" class="qty-btn" data-index="${index}" data-delta="-1">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button type="button" class="qty-btn" data-index="${index}" data-delta="1">+</button>
            </div>
          </div>
          <button type="button" class="btn-remove-cart" data-index="${index}" title="Remove item">✕</button>
        </div>
      `;
      })
      .join("");

    // Calculate Totals
    const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const minFree = state.restaurantInfo.minFreeDelivery || 1000;
    const isFreeDelivery = subtotal >= minFree;
    const deliveryFee = isFreeDelivery ? 0 : state.restaurantInfo.deliveryFee || 100;
    const grandTotal = subtotal + deliveryFee;

    if (elements.cartSubtotal) elements.cartSubtotal.textContent = `Rs. ${subtotal}`;
    if (elements.cartDelivery) {
      elements.cartDelivery.innerHTML = isFreeDelivery
        ? `<span style="color: #00ff88; font-weight: 700;">FREE</span>`
        : `Rs. ${deliveryFee}`;
    }
    if (elements.cartTotal) elements.cartTotal.textContent = `Rs. ${grandTotal}`;

    // Delivery Progress Bar
    if (elements.deliveryProgressFill && elements.amountNeededText) {
      if (isFreeDelivery) {
        elements.deliveryProgressFill.style.width = "100%";
        elements.deliveryProgressFill.classList.add("full");
        elements.amountNeededText.innerHTML = `🎉 <strong>Congratulations!</strong> You get FREE delivery!`;
      } else {
        const remaining = minFree - subtotal;
        const percent = Math.min(100, Math.round((subtotal / minFree) * 100));
        elements.deliveryProgressFill.style.width = `${percent}%`;
        elements.deliveryProgressFill.classList.remove("full");
        elements.amountNeededText.innerHTML = `Add <strong>Rs. ${remaining}</strong> more for FREE delivery`;
      }
    }
  }

  function saveCartToStorage() {
    localStorage.setItem("ice_fire_cart", JSON.stringify(state.cart));
  }

  function loadCartFromStorage() {
    const saved = localStorage.getItem("ice_fire_cart");
    if (saved) {
      try {
        state.cart = JSON.parse(saved);
      } catch (e) {
        state.cart = [];
      }
    }
  }

  // --- WHATSAPP ORDER CHECKOUT ---
  function handleWhatsAppCheckout() {
    if (state.cart.length === 0) {
      showToast("⚠️ Your cart is empty. Please add dishes first!");
      return;
    }

    const name = elements.custName ? elements.custName.value.trim() : "";
    const phone = elements.custPhone ? elements.custPhone.value.trim() : "";
    const address = elements.custAddress ? elements.custAddress.value.trim() : "";
    const notes = elements.custNotes ? elements.custNotes.value.trim() : "";

    if (!name || !phone || !address) {
      showToast("⚠️ Please fill your Name, Phone, and Delivery Address in Quetta!");
      if (elements.custName && !name) elements.custName.focus();
      else if (elements.custPhone && !phone) elements.custPhone.focus();
      else if (elements.custAddress && !address) elements.custAddress.focus();
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const minFree = state.restaurantInfo.minFreeDelivery || 1000;
    const isFree = subtotal >= minFree;
    const deliveryFee = isFree ? 0 : state.restaurantInfo.deliveryFee || 100;
    const grandTotal = subtotal + deliveryFee;

    // Build Itemized Text
    let itemsText = "";
    state.cart.forEach((item, idx) => {
      const sizeStr = item.sizeLabel ? ` (${item.sizeLabel})` : "";
      itemsText += `${idx + 1}. ${item.quantity}x ${item.name}${sizeStr} - Rs. ${item.unitPrice * item.quantity}\n`;
    });

    const orderId = "IF-" + Math.floor(100000 + Math.random() * 900000);
    const orderTimestamp = new Date().toLocaleString();

    // Construct WhatsApp message
    const message = `🔥 *ICE & FIRE RESTAURANT - NEW ORDER* ❄️
*Order ID:* ${orderId}
*Date:* ${orderTimestamp}
---------------------------------
👤 *Customer:* ${name}
📞 *Phone:* ${phone}
📍 *Delivery Address:* ${address}
${notes ? `📝 *Special Notes:* ${notes}\n` : ""}---------------------------------
🍽️ *ORDERED ITEMS:*
${itemsText}---------------------------------
💵 *Subtotal:* Rs. ${subtotal}
🛵 *Delivery Fee:* ${isFree ? "FREE (Above Rs. 1000)" : `Rs. ${deliveryFee}`}
⭐ *TOTAL PAYABLE:* Rs. ${grandTotal} PKR
---------------------------------
Restaurant: Faisal Tower, Satellite Town, Quetta
Landline: 081-2444351`;

    // Save Order into Admin DB
    const newOrder = {
      id: orderId,
      date: orderTimestamp,
      customerName: name,
      customerPhone: phone,
      deliveryAddress: address,
      notes: notes,
      items: [...state.cart],
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: grandTotal,
      status: "Pending"
    };

    if (window.IceFireDB) {
      const existingOrders = window.IceFireDB.getOrders();
      existingOrders.unshift(newOrder);
      window.IceFireDB.saveOrders(existingOrders);
    }

    // Clean cart
    state.cart = [];
    saveCartToStorage();
    updateCartUI();
    closeCart();

    // Trigger WhatsApp URL
    const targetWhatsApp = (state.restaurantInfo.whatsapp || "03337840004").replace(/[^0-9]/g, "");
    const formattedNumber = targetWhatsApp.startsWith("0") ? "92" + targetWhatsApp.slice(1) : targetWhatsApp;
    const waUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;

    showToast("🎉 Order placed! Opening WhatsApp to send your order...");
    window.open(waUrl, "_blank");
  }

  // --- TABLE RESERVATION ---
  function handleReservationSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("resName").value.trim();
    const phone = document.getElementById("resPhone").value.trim();
    const guests = document.getElementById("resGuests").value;
    const date = document.getElementById("resDate").value;
    const time = document.getElementById("resTime").value;
    const area = document.getElementById("resArea").value;
    const notes = document.getElementById("resNotes").value.trim();

    if (!name || !phone || !date || !time) {
      showToast("⚠️ Please provide all required reservation details.");
      return;
    }

    const resId = "RES-" + Math.floor(1000 + Math.random() * 9000);
    const newRes = {
      id: resId,
      name,
      phone,
      guests,
      date,
      time,
      area,
      notes,
      createdAt: new Date().toLocaleString(),
      status: "Confirmed"
    };

    if (window.IceFireDB) {
      const existing = window.IceFireDB.getReservations();
      existing.unshift(newRes);
      window.IceFireDB.saveReservations(existing);
    }

    showToast(`✅ Table reserved for ${name} (${guests} Guests) on ${date}!`);
    elements.reservationForm.reset();

    // Optional confirmation message to WhatsApp
    const waText = `🍽️ *ICE & FIRE RESTAURANT - TABLE RESERVATION*
Reservation ID: ${resId}
Guest: ${name}
Phone: ${phone}
Party Size: ${guests} Guests
Date: ${date} at ${time}
Area: ${area}
Special Request: ${notes || "None"}`;

    const targetWhatsApp = (state.restaurantInfo.whatsapp || "03337840004").replace(/[^0-9]/g, "");
    const formattedNumber = targetWhatsApp.startsWith("0") ? "92" + targetWhatsApp.slice(1) : targetWhatsApp;
    const confirmWa = confirm("Would you also like to send this reservation directly to WhatsApp for instant confirmation?");
    if (confirmWa) {
      window.open(`https://wa.me/${formattedNumber}?text=${encodeURIComponent(waText)}`, "_blank");
    }
  }

  // --- LIGHTBOX / ORIGINAL MENU SCANS MODAL ---
  function setupLightbox() {
    if (!elements.lightboxModal || !window.IceFireDB) return;
    const scans = window.IceFireDB.MENU_SCANS;

    if (elements.lightboxTabs) {
      elements.lightboxTabs.innerHTML = scans
        .map((scan, idx) => {
          return `
            <button class="lightbox-tab-btn ${idx === 0 ? "active" : ""}" data-index="${idx}">
              ${idx === 0 ? "Cover / Concept" : `Page ${idx}`}
            </button>
          `;
        })
        .join("");

      elements.lightboxTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".lightbox-tab-btn");
        if (!btn) return;
        const index = parseInt(btn.dataset.index, 10);
        openLightbox(index);
      });
    }

    if (elements.lightboxClose) {
      elements.lightboxClose.addEventListener("click", closeLightbox);
    }

    elements.lightboxModal.addEventListener("click", (e) => {
      if (e.target === elements.lightboxModal) {
        closeLightbox();
      }
    });
  }

  function openLightbox(index) {
    if (!elements.lightboxModal || !window.IceFireDB) return;
    const scans = window.IceFireDB.MENU_SCANS;
    const scan = scans[index] || scans[0];

    state.activeScanIndex = index;
    if (elements.lightboxImg) elements.lightboxImg.src = scan.image;
    if (elements.lightboxTitle) elements.lightboxTitle.textContent = scan.title;

    if (elements.lightboxTabs) {
      elements.lightboxTabs.querySelectorAll(".lightbox-tab-btn").forEach((btn, idx) => {
        if (idx === index) btn.classList.add("active");
        else btn.classList.remove("active");
      });
    }

    elements.lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (elements.lightboxModal) elements.lightboxModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // --- TOAST NOTIFICATIONS ---
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${message}</span>`;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Start on load
  document.addEventListener("DOMContentLoaded", init);
})();
