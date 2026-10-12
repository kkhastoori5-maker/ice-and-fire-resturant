/**
 * Ice & Fire Restaurant - Executive Admin Panel Logic
 * Quetta, Pakistan
 */

(function () {
  "use strict";

  const ADMIN_PIN = "ice123";

  const state = {
    isAuthenticated: false,
    currentTab: "overview",
    menuItems: [],
    restaurantInfo: {},
    orders: [],
    reservations: [],
    editingItemId: null,
    viewingOrderId: null,
    menuSearch: "",
    menuCatFilter: "all"
  };

  // DOM Elements
  const el = {
    authOverlay: document.getElementById("authOverlay"),
    pinInput: document.getElementById("pinInput"),
    pinSubmitBtn: document.getElementById("pinSubmitBtn"),
    authErrorMsg: document.getElementById("authErrorMsg"),
    adminLayout: document.getElementById("adminLayout"),
    btnLogout: document.getElementById("btnLogout"),

    // Sidebar & Tabs
    sidebarMenu: document.getElementById("sidebarMenu"),
    tabPanes: document.querySelectorAll(".admin-tab-pane"),
    topbarTitle: document.getElementById("topbarTitle"),
    orderCountBadge: document.getElementById("orderCountBadge"),
    resCountBadge: document.getElementById("resCountBadge"),

    // KPIs
    kpiDishes: document.getElementById("kpiDishes"),
    kpiOrders: document.getElementById("kpiOrders"),
    kpiRevenue: document.getElementById("kpiRevenue"),
    kpiReservations: document.getElementById("kpiReservations"),

    // Menu Management
    menuTableBody: document.getElementById("menuTableBody"),
    adminMenuSearch: document.getElementById("adminMenuSearch"),
    adminCatFilter: document.getElementById("adminCatFilter"),
    btnOpenAddDish: document.getElementById("btnOpenAddDish"),
    dishModal: document.getElementById("dishModal"),
    dishModalTitle: document.getElementById("dishModalTitle"),
    dishForm: document.getElementById("dishForm"),
    btnCloseDishModal: document.getElementById("btnCloseDishModal"),
    btnCancelDishModal: document.getElementById("btnCancelDishModal"),

    // Dish Form Fields
    dishIdInput: document.getElementById("dishIdInput"),
    dishNumInput: document.getElementById("dishNumInput"),
    dishNameInput: document.getElementById("dishNameInput"),
    dishUrduInput: document.getElementById("dishUrduInput"),
    dishCatInput: document.getElementById("dishCatInput"),
    dishPriceInput: document.getElementById("dishPriceInput"),
    dishHalfPriceInput: document.getElementById("dishHalfPriceInput"),
    dishBadgeInput: document.getElementById("dishBadgeInput"),
    dishImgInput: document.getElementById("dishImgInput"),
    dishDescInput: document.getElementById("dishDescInput"),
    dishStockInput: document.getElementById("dishStockInput"),

    // Orders Management
    ordersTableBody: document.getElementById("ordersTableBody"),
    recentOrdersBody: document.getElementById("recentOrdersBody"),
    receiptModal: document.getElementById("receiptModal"),
    receiptContent: document.getElementById("receiptContent"),
    btnCloseReceipt: document.getElementById("btnCloseReceipt"),
    btnPrintReceipt: document.getElementById("btnPrintReceipt"),

    // Reservations
    reservationsTableBody: document.getElementById("reservationsTableBody"),

    // Settings
    settingsForm: document.getElementById("settingsForm"),
    settingPhone: document.getElementById("settingPhone"),
    settingWhatsapp: document.getElementById("settingWhatsapp"),
    settingAddress: document.getElementById("settingAddress"),
    settingMinDelivery: document.getElementById("settingMinDelivery"),
    settingDeliveryFee: document.getElementById("settingDeliveryFee"),
    settingTiming: document.getElementById("settingTiming"),

    // Backup & Reset
    btnResetMenu: document.getElementById("btnResetMenu"),
    btnExportMenu: document.getElementById("btnExportMenu"),
    btnImportMenu: document.getElementById("btnImportMenu"),
    importFileInput: document.getElementById("importFileInput")
  };

  // Initialize
  function init() {
    checkAuthSession();
    setupEventListeners();
  }

  // Authentication
  function checkAuthSession() {
    const sessionAuth = sessionStorage.getItem("ice_fire_admin_logged");
    if (sessionAuth === "true") {
      state.isAuthenticated = true;
      showAdminDashboard();
    } else {
      showAuthOverlay();
    }
  }

  function showAuthOverlay() {
    if (el.authOverlay) el.authOverlay.style.display = "flex";
    if (el.adminLayout) el.adminLayout.style.display = "none";
  }

  function showAdminDashboard() {
    if (el.authOverlay) el.authOverlay.style.display = "none";
    if (el.adminLayout) el.adminLayout.style.display = "flex";
    loadData();
    renderAll();
  }

  function handleLogin() {
    const val = el.pinInput.value.trim();
    if (val === ADMIN_PIN || val === "admin") {
      sessionStorage.setItem("ice_fire_admin_logged", "true");
      state.isAuthenticated = true;
      if (el.authErrorMsg) el.authErrorMsg.style.display = "none";
      showAdminDashboard();
    } else {
      if (el.authErrorMsg) {
        el.authErrorMsg.textContent = "Invalid PIN. Default password is: ice123";
        el.authErrorMsg.style.display = "block";
      }
      el.pinInput.value = "";
      el.pinInput.focus();
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("ice_fire_admin_logged");
    state.isAuthenticated = false;
    showAuthOverlay();
  }

  // Load Data
  function loadData() {
    if (window.IceFireDB) {
      state.menuItems = window.IceFireDB.getMenuItems();
      state.restaurantInfo = window.IceFireDB.getRestaurantInfo();
      state.orders = window.IceFireDB.getOrders();
      state.reservations = window.IceFireDB.getReservations();
    }
  }

  // Render All Views
  function renderAll() {
    renderKPIs();
    renderMenuTable();
    renderOrdersTable();
    renderRecentOrders();
    renderReservationsTable();
    populateSettingsForm();
    updateBadges();
  }

  function updateBadges() {
    const pendingOrders = state.orders.filter((o) => o.status === "Pending").length;
    if (el.orderCountBadge) {
      el.orderCountBadge.textContent = pendingOrders;
      el.orderCountBadge.style.display = pendingOrders > 0 ? "inline-block" : "none";
    }

    const pendingRes = state.reservations.filter((r) => r.status === "Confirmed").length;
    if (el.resCountBadge) {
      el.resCountBadge.textContent = pendingRes;
      el.resCountBadge.style.display = pendingRes > 0 ? "inline-block" : "none";
    }
  }

  // KPIs
  function renderKPIs() {
    if (el.kpiDishes) el.kpiDishes.textContent = state.menuItems.length;
    if (el.kpiOrders) el.kpiOrders.textContent = state.orders.length;

    const totalRev = state.orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);
    if (el.kpiRevenue) el.kpiRevenue.textContent = `Rs. ${totalRev.toLocaleString()}`;

    if (el.kpiReservations) el.kpiReservations.textContent = state.reservations.length;
  }

  // Menu Table
  function renderMenuTable() {
    if (!el.menuTableBody) return;

    let items = [...state.menuItems];
    if (state.menuCatFilter !== "all") {
      items = items.filter((it) => it.category === state.menuCatFilter);
    }
    if (state.menuSearch.trim() !== "") {
      const q = state.menuSearch.toLowerCase().trim();
      items = items.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          (it.urdu && it.urdu.includes(q)) ||
          String(it.num).includes(q)
      );
    }

    if (items.length === 0) {
      el.menuTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--text-muted);">No dishes found.</td></tr>`;
      return;
    }

    el.menuTableBody.innerHTML = items
      .map((dish) => {
        const catObj = window.IceFireDB?.DEFAULT_CATEGORIES.find((c) => c.id === dish.category);
        const catName = catObj ? `${catObj.icon} ${catObj.name}` : dish.category;
        const priceDisplay = dish.hasSizes && dish.halfPrice
          ? `Rs. ${dish.price} / Rs. ${dish.halfPrice}`
          : `Rs. ${dish.price}`;

        return `
          <tr>
            <td style="font-weight: 700; color: var(--accent-gold);">#${dish.num}</td>
            <td>
              <div class="dish-cell-info">
                <img src="${dish.image}" class="dish-cell-img" alt="${dish.name}" onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80'" />
                <div>
                  <div class="dish-cell-name">${dish.name}</div>
                  <div class="dish-cell-urdu">${dish.urdu || ""}</div>
                </div>
              </div>
            </td>
            <td><span class="badge" style="background: rgba(255,255,255,0.08);">${catName}</span></td>
            <td style="font-weight: 700; color: #ffffff;">${priceDisplay}</td>
            <td>
              ${dish.badge ? `<span class="badge" style="background: rgba(223,183,108,0.15); color: var(--accent-gold);">${dish.badge}</span>` : "-"}
            </td>
            <td>
              <label class="switch-label">
                <input type="checkbox" class="switch-input toggle-stock-cb" data-id="${dish.id}" ${dish.inStock ? "checked" : ""} />
                <span style="font-size: 0.78rem; color: ${dish.inStock ? "var(--accent-success)" : "var(--accent-danger)"}">
                  ${dish.inStock ? "In Stock" : "Sold Out"}
                </span>
              </label>
            </td>
            <td>
              <div class="action-btns">
                <button type="button" class="icon-btn edit btn-edit-dish" data-id="${dish.id}" title="Edit Dish">✏️</button>
                <button type="button" class="icon-btn danger btn-delete-dish" data-id="${dish.id}" title="Delete Dish">🗑️</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Orders Table
  function renderOrdersTable() {
    if (!el.ordersTableBody) return;

    if (state.orders.length === 0) {
      el.ordersTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--text-muted);">No orders received yet. Placed orders will appear here in real time.</td></tr>`;
      return;
    }

    el.ordersTableBody.innerHTML = state.orders
      .map((order) => {
        const statusBadgeClass = {
          Pending: "badge-pending",
          Preparing: "badge-preparing",
          "Out for Delivery": "badge-delivery",
          Delivered: "badge-completed",
          Cancelled: "badge-cancelled"
        }[order.status] || "badge-pending";

        const itemsSummary = order.items
          ? order.items.map((it) => `${it.quantity}x ${it.name}`).join(", ")
          : "";

        return `
          <tr>
            <td style="font-weight: 700; color: var(--accent-ice);">${order.id}</td>
            <td style="font-size: 0.8rem; color: var(--text-muted);">${order.date}</td>
            <td>
              <div style="font-weight: 600; color: #ffffff;">${order.customerName}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${order.customerPhone}</div>
              <div style="font-size: 0.74rem; color: var(--text-dim); max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${order.deliveryAddress}</div>
            </td>
            <td style="font-size: 0.8rem; max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${itemsSummary}">
              ${itemsSummary}
            </td>
            <td style="font-weight: 800; color: var(--accent-gold);">Rs. ${order.total}</td>
            <td>
              <select class="admin-select order-status-select" data-id="${order.id}" style="padding: 4px 8px; font-size: 0.78rem;">
                <option value="Pending" ${order.status === "Pending" ? "selected" : ""}>Pending</option>
                <option value="Preparing" ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
                <option value="Out for Delivery" ${order.status === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
                <option value="Delivered" ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
                <option value="Cancelled" ${order.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
              </select>
            </td>
            <td>
              <div class="action-btns">
                <button type="button" class="icon-btn btn-view-receipt" data-id="${order.id}" title="View & Print Receipt">🧾</button>
                <button type="button" class="icon-btn btn-wa-customer" data-phone="${order.customerPhone}" data-id="${order.id}" title="Message on WhatsApp">💬</button>
                <button type="button" class="icon-btn danger btn-delete-order" data-id="${order.id}" title="Delete Order Record">🗑️</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Recent Orders (Overview widget)
  function renderRecentOrders() {
    if (!el.recentOrdersBody) return;
    const recents = state.orders.slice(0, 5);

    if (recents.length === 0) {
      el.recentOrdersBody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-muted);">No orders yet.</td></tr>`;
      return;
    }

    el.recentOrdersBody.innerHTML = recents
      .map((ord) => {
        return `
          <tr>
            <td style="font-weight: 700; color: var(--accent-ice);">${ord.id}</td>
            <td>${ord.customerName}</td>
            <td style="font-weight: 700; color: var(--accent-gold);">Rs. ${ord.total}</td>
            <td><span class="badge badge-pending">${ord.status}</span></td>
            <td>
              <button type="button" class="icon-btn btn-view-receipt" data-id="${ord.id}" title="View Receipt">🧾</button>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Reservations Table
  function renderReservationsTable() {
    if (!el.reservationsTableBody) return;

    if (state.reservations.length === 0) {
      el.reservationsTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 30px; color: var(--text-muted);">No table reservations recorded yet.</td></tr>`;
      return;
    }

    el.reservationsTableBody.innerHTML = state.reservations
      .map((res) => {
        return `
          <tr>
            <td style="font-weight: 700; color: var(--accent-gold);">${res.id}</td>
            <td>
              <div style="font-weight: 600; color: #ffffff;">${res.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${res.phone}</div>
            </td>
            <td>${res.guests} Guests</td>
            <td style="font-size: 0.82rem; color: var(--accent-ice);">${res.date} at ${res.time}</td>
            <td><span class="badge" style="background: rgba(255,255,255,0.08);">${res.area || "Main Hall"}</span></td>
            <td>
              <select class="admin-select res-status-select" data-id="${res.id}" style="padding: 4px 8px; font-size: 0.78rem;">
                <option value="Confirmed" ${res.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                <option value="Seated" ${res.status === "Seated" ? "selected" : ""}>Seated</option>
                <option value="Cancelled" ${res.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
              </select>
            </td>
            <td>
              <div class="action-btns">
                <button type="button" class="icon-btn btn-wa-res" data-phone="${res.phone}" data-id="${res.id}" title="WhatsApp Guest">💬</button>
                <button type="button" class="icon-btn danger btn-delete-res" data-id="${res.id}" title="Delete">🗑️</button>
              </div>
            </td>
          </tr>
        `;
      })
      .join("");
  }

  // Settings
  function populateSettingsForm() {
    if (!el.settingsForm) return;
    const info = state.restaurantInfo;
    if (el.settingPhone) el.settingPhone.value = info.phone || "081-2444351";
    if (el.settingWhatsapp) el.settingWhatsapp.value = info.whatsapp || "0333-7840004";
    if (el.settingAddress) el.settingAddress.value = info.address || "Faisal Tower, 5283+MX6, Mini Market Rd, Satellite Town, Quetta, Pakistan";
    if (el.settingMinDelivery) el.settingMinDelivery.value = info.minFreeDelivery || 1000;
    if (el.settingDeliveryFee) el.settingDeliveryFee.value = info.deliveryFee || 100;
    if (el.settingTiming) el.settingTiming.value = info.timing || "12:00 PM - 02:00 AM (Daily)";
  }

  // Setup Event Handlers
  function setupEventListeners() {
    // Auth login
    if (el.pinSubmitBtn) {
      el.pinSubmitBtn.addEventListener("click", handleLogin);
    }
    if (el.pinInput) {
      el.pinInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleLogin();
      });
    }
    if (el.btnLogout) {
      el.btnLogout.addEventListener("click", handleLogout);
    }

    // Sidebar navigation
    if (el.sidebarMenu) {
      el.sidebarMenu.addEventListener("click", (e) => {
        const btn = e.target.closest(".menu-item-btn");
        if (!btn) return;
        const targetTab = btn.dataset.tab;
        switchTab(targetTab);
      });
    }

    // Menu search & filter
    if (el.adminMenuSearch) {
      el.adminMenuSearch.addEventListener("input", (e) => {
        state.menuSearch = e.target.value;
        renderMenuTable();
      });
    }
    if (el.adminCatFilter) {
      el.adminCatFilter.addEventListener("change", (e) => {
        state.menuCatFilter = e.target.value;
        renderMenuTable();
      });
    }

    // Menu Table clicks (Stock toggle, Edit, Delete)
    if (el.menuTableBody) {
      el.menuTableBody.addEventListener("click", (e) => {
        // Toggle Stock
        const stockCb = e.target.closest(".toggle-stock-cb");
        if (stockCb) {
          const id = stockCb.dataset.id;
          const dish = state.menuItems.find((d) => d.id === id);
          if (dish) {
            dish.inStock = stockCb.checked;
            saveMenuItems();
            renderMenuTable();
          }
          return;
        }

        // Edit
        const editBtn = e.target.closest(".btn-edit-dish");
        if (editBtn) {
          const id = editBtn.dataset.id;
          openEditDishModal(id);
          return;
        }

        // Delete
        const delBtn = e.target.closest(".btn-delete-dish");
        if (delBtn) {
          const id = delBtn.dataset.id;
          deleteDish(id);
        }
      });
    }

    // Add Dish button
    if (el.btnOpenAddDish) {
      el.btnOpenAddDish.addEventListener("click", openAddDishModal);
    }

    // Dish Modal Close
    if (el.btnCloseDishModal) el.btnCloseDishModal.addEventListener("click", closeDishModal);
    if (el.btnCancelDishModal) el.btnCancelDishModal.addEventListener("click", closeDishModal);
    if (el.dishForm) el.dishForm.addEventListener("submit", handleSaveDish);

    // Orders Table events (Status change, Receipt, WhatsApp, Delete)
    if (el.ordersTableBody) {
      el.ordersTableBody.addEventListener("change", (e) => {
        const statusSelect = e.target.closest(".order-status-select");
        if (statusSelect) {
          const orderId = statusSelect.dataset.id;
          const newStatus = statusSelect.value;
          updateOrderStatus(orderId, newStatus);
        }
      });

      el.ordersTableBody.addEventListener("click", (e) => {
        const receiptBtn = e.target.closest(".btn-view-receipt");
        if (receiptBtn) {
          const orderId = receiptBtn.dataset.id;
          openReceiptModal(orderId);
          return;
        }

        const waBtn = e.target.closest(".btn-wa-customer");
        if (waBtn) {
          const phone = waBtn.dataset.phone;
          const orderId = waBtn.dataset.id;
          contactCustomerWhatsApp(phone, orderId);
          return;
        }

        const delBtn = e.target.closest(".btn-delete-order");
        if (delBtn) {
          const orderId = delBtn.dataset.id;
          deleteOrder(orderId);
        }
      });
    }

    if (el.recentOrdersBody) {
      el.recentOrdersBody.addEventListener("click", (e) => {
        const receiptBtn = e.target.closest(".btn-view-receipt");
        if (receiptBtn) {
          const orderId = receiptBtn.dataset.id;
          openReceiptModal(orderId);
        }
      });
    }

    // Receipt Modal Close & Print
    if (el.btnCloseReceipt) el.btnCloseReceipt.addEventListener("click", closeReceiptModal);
    if (el.btnPrintReceipt) el.btnPrintReceipt.addEventListener("click", () => window.print());

    // Reservations Table events
    if (el.reservationsTableBody) {
      el.reservationsTableBody.addEventListener("change", (e) => {
        const resSelect = e.target.closest(".res-status-select");
        if (resSelect) {
          const resId = resSelect.dataset.id;
          const status = resSelect.value;
          const target = state.reservations.find((r) => r.id === resId);
          if (target) {
            target.status = status;
            window.IceFireDB?.saveReservations(state.reservations);
            updateBadges();
          }
        }
      });

      el.reservationsTableBody.addEventListener("click", (e) => {
        const waBtn = e.target.closest(".btn-wa-res");
        if (waBtn) {
          const phone = waBtn.dataset.phone;
          const resId = waBtn.dataset.id;
          const target = state.reservations.find((r) => r.id === resId);
          const cleanPhone = phone.replace(/[^0-9]/g, "");
          const fPhone = cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone;
          const msg = `Hello ${target?.name || "Customer"}, your table reservation (${resId}) at Ice & Fire Restaurant Quetta has been acknowledged. We look forward to hosting you!`;
          window.open(`https://wa.me/${fPhone}?text=${encodeURIComponent(msg)}`, "_blank");
          return;
        }

        const delBtn = e.target.closest(".btn-delete-res");
        if (delBtn) {
          const resId = delBtn.dataset.id;
          if (confirm("Delete this reservation record?")) {
            state.reservations = state.reservations.filter((r) => r.id !== resId);
            window.IceFireDB?.saveReservations(state.reservations);
            renderReservationsTable();
            renderKPIs();
            updateBadges();
          }
        }
      });
    }

    // Settings Form Submit
    if (el.settingsForm) {
      el.settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const updated = {
          ...state.restaurantInfo,
          phone: el.settingPhone.value.trim(),
          whatsapp: el.settingWhatsapp.value.trim(),
          address: el.settingAddress.value.trim(),
          minFreeDelivery: parseInt(el.settingMinDelivery.value, 10) || 1000,
          deliveryFee: parseInt(el.settingDeliveryFee.value, 10) || 100,
          timing: el.settingTiming.value.trim()
        };
        state.restaurantInfo = updated;
        window.IceFireDB?.saveRestaurantInfo(updated);
        alert("Restaurant settings saved successfully!");
      });
    }

    // Backup & Reset Buttons
    if (el.btnResetMenu) {
      el.btnResetMenu.addEventListener("click", () => {
        if (confirm("Reset menu to factory default from the reference pictures? Any newly added dishes will be replaced with the original 60+ dishes.")) {
          state.menuItems = window.IceFireDB?.resetMenuItems() || [];
          renderAll();
          alert("Menu restored to reference defaults!");
        }
      });
    }

    if (el.btnExportMenu) {
      el.btnExportMenu.addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.menuItems, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `ice_and_fire_menu_backup_${Date.now()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      });
    }

    if (el.btnImportMenu && el.importFileInput) {
      el.btnImportMenu.addEventListener("click", () => el.importFileInput.click());
      el.importFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
              state.menuItems = imported;
              saveMenuItems();
              renderAll();
              alert(`Successfully imported ${imported.length} menu items!`);
            } else {
              alert("Invalid JSON format. Expected an array of dishes.");
            }
          } catch (err) {
            alert("Error parsing JSON file.");
          }
        };
        reader.readAsText(file);
      });
    }
  }

  // Switch Active Tab
  function switchTab(tabId) {
    state.currentTab = tabId;
    el.sidebarMenu.querySelectorAll(".menu-item-btn").forEach((btn) => {
      if (btn.dataset.tab === tabId) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    el.tabPanes.forEach((pane) => {
      if (pane.id === `tab-${tabId}`) pane.classList.add("active");
      else pane.classList.remove("active");
    });

    const titles = {
      overview: "Dashboard Overview",
      menu: "Menu Items Management",
      orders: "Customer Live Orders",
      reservations: "Table Reservations",
      settings: "Restaurant Profile & Settings",
      backup: "Data Backup & Maintenance"
    };

    if (el.topbarTitle) {
      el.topbarTitle.querySelector("h1").textContent = titles[tabId] || "Management Panel";
    }
  }

  // --- MENU CRUD ---
  function openAddDishModal() {
    state.editingItemId = null;
    if (el.dishModalTitle) el.dishModalTitle.textContent = "Add New Dish to Menu";
    if (el.dishForm) el.dishForm.reset();
    if (el.dishIdInput) el.dishIdInput.value = "";
    if (el.dishStockInput) el.dishStockInput.checked = true;
    if (el.dishModal) el.dishModal.classList.add("active");
  }

  function openEditDishModal(id) {
    state.editingItemId = id;
    const dish = state.menuItems.find((d) => d.id === id);
    if (!dish) return;

    if (el.dishModalTitle) el.dishModalTitle.textContent = `Edit Dish: ${dish.name}`;
    if (el.dishIdInput) el.dishIdInput.value = dish.id;
    if (el.dishNumInput) el.dishNumInput.value = dish.num;
    if (el.dishNameInput) el.dishNameInput.value = dish.name;
    if (el.dishUrduInput) el.dishUrduInput.value = dish.urdu || "";
    if (el.dishCatInput) el.dishCatInput.value = dish.category;
    if (el.dishPriceInput) el.dishPriceInput.value = dish.price;
    if (el.dishHalfPriceInput) el.dishHalfPriceInput.value = dish.halfPrice || "";
    if (el.dishBadgeInput) el.dishBadgeInput.value = dish.badge || "";
    if (el.dishImgInput) el.dishImgInput.value = dish.image || "";
    if (el.dishDescInput) el.dishDescInput.value = dish.description || "";
    if (el.dishStockInput) el.dishStockInput.checked = !!dish.inStock;

    if (el.dishModal) el.dishModal.classList.add("active");
  }

  function closeDishModal() {
    if (el.dishModal) el.dishModal.classList.remove("active");
    state.editingItemId = null;
  }

  function handleSaveDish(e) {
    e.preventDefault();
    const id = el.dishIdInput.value || "item-" + Date.now();
    const num = el.dishNumInput.value.trim() || state.menuItems.length + 1;
    const name = el.dishNameInput.value.trim();
    const urdu = el.dishUrduInput.value.trim();
    const category = el.dishCatInput.value;
    const price = parseInt(el.dishPriceInput.value, 10) || 0;
    const halfPrice = el.dishHalfPriceInput.value ? parseInt(el.dishHalfPriceInput.value, 10) : null;
    const badge = el.dishBadgeInput.value.trim();
    const image = el.dishImgInput.value.trim() || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80";
    const description = el.dishDescInput.value.trim();
    const inStock = el.dishStockInput.checked;

    if (!name || price <= 0) {
      alert("Please provide a valid dish name and price.");
      return;
    }

    const dishData = {
      id,
      num,
      name,
      urdu,
      category,
      price,
      halfPrice,
      hasSizes: !!halfPrice,
      badge,
      image,
      description,
      inStock
    };

    if (state.editingItemId) {
      const idx = state.menuItems.findIndex((d) => d.id === state.editingItemId);
      if (idx > -1) {
        state.menuItems[idx] = { ...state.menuItems[idx], ...dishData };
      }
    } else {
      state.menuItems.unshift(dishData);
    }

    saveMenuItems();
    closeDishModal();
    renderMenuTable();
    renderKPIs();
  }

  function deleteDish(id) {
    const dish = state.menuItems.find((d) => d.id === id);
    if (!dish) return;
    if (confirm(`Are you sure you want to delete "${dish.name}" from the menu?`)) {
      state.menuItems = state.menuItems.filter((d) => d.id !== id);
      saveMenuItems();
      renderMenuTable();
      renderKPIs();
    }
  }

  function saveMenuItems() {
    window.IceFireDB?.saveMenuItems(state.menuItems);
  }

  // --- ORDER MANAGEMENT ---
  function updateOrderStatus(orderId, newStatus) {
    const ord = state.orders.find((o) => o.id === orderId);
    if (ord) {
      ord.status = newStatus;
      window.IceFireDB?.saveOrders(state.orders);
      renderKPIs();
      updateBadges();
    }
  }

  function deleteOrder(orderId) {
    if (confirm(`Delete record for order ${orderId}?`)) {
      state.orders = state.orders.filter((o) => o.id !== orderId);
      window.IceFireDB?.saveOrders(state.orders);
      renderOrdersTable();
      renderRecentOrders();
      renderKPIs();
      updateBadges();
    }
  }

  function openReceiptModal(orderId) {
    const ord = state.orders.find((o) => o.id === orderId);
    if (!ord || !el.receiptContent) return;

    state.viewingOrderId = orderId;
    let itemsRows = "";
    if (ord.items) {
      ord.items.forEach((item) => {
        const size = item.sizeLabel ? ` (${item.sizeLabel})` : "";
        itemsRows += `
          <tr>
            <td style="text-align: left;">${item.quantity}x ${item.name}${size}</td>
            <td style="text-align: right;">Rs. ${item.unitPrice * item.quantity}</td>
          </tr>
        `;
      });
    }

    el.receiptContent.innerHTML = `
      <div class="invoice-box">
        <div class="invoice-header">
          <h2>ICE & FIRE RESTAURANT</h2>
          <p style="font-size: 0.8rem;">Cafe, Restaurant & Bar • A Fusion Concept</p>
          <p style="font-size: 0.75rem;">Faisal Tower, Satellite Town, Quetta</p>
          <p style="font-size: 0.75rem;">Phone: 081-2444351 | Mobile: 0333-7840004</p>
          <hr style="margin: 8px 0; border: none; border-top: 1px dashed #000;" />
          <p style="font-weight: 700;">ORDER INVOICE: ${ord.id}</p>
          <p style="font-size: 0.8rem;">Date: ${ord.date}</p>
        </div>
        <div style="font-size: 0.82rem; margin-bottom: 12px;">
          <div><strong>Customer:</strong> ${ord.customerName}</div>
          <div><strong>Phone:</strong> ${ord.customerPhone}</div>
          <div><strong>Address:</strong> ${ord.deliveryAddress}</div>
          ${ord.notes ? `<div><strong>Notes:</strong> ${ord.notes}</div>` : ""}
          <div><strong>Status:</strong> ${ord.status}</div>
        </div>
        <table class="invoice-items">
          <thead>
            <tr style="border-bottom: 1px dashed #000;">
              <th style="text-align: left;">Item</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>
        <div style="font-size: 0.85rem; display: flex; justify-content: space-between; margin-top: 6px;">
          <span>Subtotal:</span>
          <span>Rs. ${ord.subtotal}</span>
        </div>
        <div style="font-size: 0.85rem; display: flex; justify-content: space-between;">
          <span>Delivery Fee:</span>
          <span>${ord.deliveryFee === 0 ? "FREE" : `Rs. ${ord.deliveryFee}`}</span>
        </div>
        <div class="invoice-total">
          <span>GRAND TOTAL:</span>
          <span>Rs. ${ord.total} PKR</span>
        </div>
        <div style="text-align: center; margin-top: 20px; font-size: 0.75rem;">
          <p>Thank you for choosing Ice & Fire!</p>
          <p>For inquiries call: 081-2444351</p>
        </div>
      </div>
    `;

    if (el.receiptModal) el.receiptModal.classList.add("active");
  }

  function closeReceiptModal() {
    if (el.receiptModal) el.receiptModal.classList.remove("active");
  }

  function contactCustomerWhatsApp(phone, orderId) {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const fPhone = cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone;
    const msg = `Hello from Ice & Fire Restaurant Quetta! Regarding your order ${orderId}: We are preparing it fresh for delivery to your address.`;
    window.open(`https://wa.me/${fPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
