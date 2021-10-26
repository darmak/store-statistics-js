/**
 * View class. Knows everything about dom & manipulation and a little bit about data structure, which should be
 * filled into UI element.
 *
 * @constructor
 */
function View() {
    /**
     * HTMLElement for refer to the list of Stores.
	 * ID of the "search" button DOM element'
	 * @constant
	 * @type {HTMLElement}
     * 
     * @private
	 */
    const _StoresList = document.querySelector(".store-list-content");

    /**
	 * Fill the data into Stores list (dynamically create the list items for user).
	 *
	 * @param {Object[]} listStores
     * 
     * @public
	 */
    this.renderStoresList = function(listStores) {
        _StoresList.innerHTML = "";
        listStores.forEach(item => {
        _StoresList.innerHTML += `
            <li data-id="${item.id}" class="store-list__item">
                <div class="store-list-item-info">
                    <div class="store-list-item-info__title">
                        <h2>${item.Name}</h2>
                    </div>
                    <div class="store-list-item-info__address">
                        <span>${item.Address}</span>
                    </div>
                </div>
                <div class="store-list-item__square">
                    <span class="square__length">${item.FloorArea}</span>
                    <span class="square__unit">sq.m</span>
                </div>
            </li>`;
        });
    };

    /**
	 * Return currently HTMLElement for check.
	 *
     * @param {HTMLElement} event
     * 
	 * @returns {HTMLElement}
	 *
	 * @public
	 */
    this.getChooseStoreItem = function(event) {
        return event.target.closest("li").classList.contains("store-list__item");
    }
    /**
	 * Return currently Store.
	 *
     * @param {HTMLElement} event
     * 
	 * @returns {HTMLElement}
	 *
	 * @public
	 */
    this.getCurrentItem = function(event) {
        return event.target.closest("li");
    }

    /**
	 * Рighlight current Store
	 *
     * @param {HTMLElement} currentItem
	 *
	 * @public
	 */
    this.makeActiveStoreItem = function(currentItem) {
        document.querySelectorAll(".store-list__item").forEach((item) => {
            item.classList.remove("js-list-item-active");
        });
        currentItem.classList.add("js-list-item-active");
    }

    /**
	 * Change classes for details table.
	 *
     * @param {HTMLElement} detailsTable
	 *
	 * @public
	 */
    this.makeStoreTable = function(detailsTable) {
        detailsTable.classList.remove("default-data");
        detailsTable.classList.add("store-details");
        detailsTable.innerHTML= "";
    }

    /**
	 * return table for details.
	 *
     * @returns {HTMLElement}
     * 
	 * @public
	 */
    this.getDetailsTable = function() {
        return document.querySelector(".store-details");
    }

    /**
	 * render header for table details.
	 *
     * @param {HTMLElement} place table details
     * 
     * @param {Object} item information about current Store.
     * 
	 * @public
	 */
    this.renderStoreDetailsHeader = function(place, item) {
        place.innerHTML += `
        <div class="store-list-header__title details__title">
            <h2>Store Details</h2>
        </div>
        <div class="store-details__contacts">
        <div class="store-details__contacts__item">
            <p class="store-details__contacts__item__text"><strong>Email: </strong><span class="js-contacts-Email">${item.Email}</span></p>
            <p class="store-details__contacts__item__text"><strong>Phone Number: </strong><span class="js-contacts-phoneNumber">${item.PhoneNumber}</span></p>
            <p class="store-details__contacts__item__text"><strong>Address: </strong><span class="js-contacts-address">${item.Address}</span></p>
        </div>
        <div class="store-details__contacts__item">
            <p class="store-details__contacts__item__text"><strong>Established Date: </strong><span class="js-contacts-established">${item.Established}</span></p>
            <p class="store-details__contacts__item__text"><strong>Floor Area: </strong><span class="js-contacts-floorArea">${item.FloorArea}</span></p>
        </div>
        </div>`;
    }
    /**
	 * update information in table header for new Store.
     * 
     * @param {Object} item information about current Store.
     * 
	 * @public
	 */
    this.updateContactsData = function(item) {
        const userEmail = document.querySelector(".js-contacts-Email");
        const userPhoneNumber = document.querySelector(".js-contacts-phoneNumber");
        const userAddress = document.querySelector(".js-contacts-address");
        const userEstablished = document.querySelector(".js-contacts-established");
        const userFloorArea = document.querySelector(".js-contacts-floorArea");
        userEmail.innerHTML = item.Email;
        userPhoneNumber.innerHTML = item.PhoneNumber;
        userAddress.innerHTML = item.Address;
        userEstablished.innerHTML = item.Established;
        userFloorArea.innerHTML = item.FloorArea;
    }

    /**
	 * render header for table details.
	 *
     * @param {HTMLElement} place table details
     * 
     * @param {Object[]} item information about details.
     * 
	 * @public
	 */
    this.renderStatusFilter = (place, item) => {
        const statuses = this.statusCounter(item);
        place.innerHTML += `
        <section class="store-details__products-status-filter">
            <div class="products-status-filter-amount" data-status="all">
                <h2 class="products-status-filter-amount__number">${statuses.OK + statuses.Storage + statuses.outStock}</h2>
                <p class="products-status-filter-amount__subtext">all</p>
            </div>

            <div class="products-status-filter__item">
                <div class="products-status-filter__item-wrapper">
                    <div class="products-status-filter-img products-status-done" data-status="OK">
                        <img class="products-status-filter__picture" src="./img/store-done.png" alt="">
                    </div>
                    <div class="products-status-filter__position">
                        <p>Ok</p>
                    </div>
                </div>
                <div class="products-status-filter__part">
                    <p class="js-status-OK">${statuses.OK}</p>
                </div>
            </div>

            <div class="products-status-filter__item">
                <div class="products-status-filter__item-wrapper">
                    <div class="products-status-filter-img products-status-storage" data-status="STORAGE">
                        <img class="products-status-filter__picture" src="./img/store-storage.png" alt="">
                    </div>
                    <div class="products-status-filter__position">
                        <p>Storage</p>
                    </div>
                </div>
                <div class="products-status-filter__part">
                    <p class="js-status-storage">${statuses.Storage}</p>
                </div>
            </div>

            <div class="products-status-filter__item">
                <div class="products-status-filter__item-wrapper">
                    <div class="products-status-filter-img products-status-stock" data-status="OUT_OF_STOCK">
                        <img class="products-status-filter__picture" src="./img/store-stock.png" alt="">
                    </div>
                    <div class="products-status-filter__position">
                        <p>Out of stock</p>
                    </div>
                </div>
                <div class="products-status-filter__part">
                    <p class="js-status-outStock">${statuses.outStock}</p>
                </div>
            </div>
            
        </section>`;
    }

    /**
	 * counts the number of statuses of details.
     * 
     * @param {Object[]} item information about details.
     * 
     * @returns {Object} 
     * 
	 * @public
	 */
    this.statusCounter = function(item) {
        const status = {
            "OK": 0,
            "Storage": 0,
            "outStock": 0
        }
    
        item.forEach((item) => {
            if (item.Status === "OK") {
                status.OK++;
            } else if (item.Status === "OUT_OF_STOCK") {
                status.outStock++;
            } else if (item.Status === "STORAGE") {
                status.Storage++;
            }
        });
        return status;
    }

    /**
	 * update information in Statuses details for new Store.
     * 
     * @param {Object[]} item information about details.
     * 
	 * @public
	 */
    this.updateStatusFilter = (item) => {
        let statuses = this.statusCounter(item);
        let statusFilterAmount = document.querySelector(".products-status-filter-amount__number");
        let statusOKText = document.querySelector(".js-status-OK");
        let statusStorageText = document.querySelector(".js-status-storage");
        let statusOutStockText = document.querySelector(".js-status-outStock");
        statusFilterAmount.innerHTML = statuses.OK + statuses.Storage + statuses.outStock;
        statusOKText.innerHTML = statuses.OK;
        statusStorageText.innerHTML = statuses.Storage;
        statusOutStockText.innerHTML = statuses.outStock;
    }

    /**
	 * Get status buttons.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtns = function() {
        return {
            btnStatusAll : document.querySelector("[data-status='all']"),
            btnStatusOK : document.querySelector("[data-status='OK']"),
            btnStatusStorage : document.querySelector("[data-status='STORAGE']"),
            btnStatusStock : document.querySelector("[data-status='OUT_OF_STOCK']")
        }
    }

    /**
	 * Get classes for background status buttons.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtnsBgClass = function() {
        return {
            bgOK : "products-background-OK",
            bgStorage: "products-background-Storage",
            bgStock: "products-background-Stock"
        }
    }

    /**
	 * remove background classes from all status buttons.
     * 
     * @param {HTMLElement} btnFir first button for remove class.
     * 
     * @param {HTMLElement} btnSec second button for remove class.
     * 
     * @param {HTMLElement} btnThird third button for remove class.
     * 
     * @param {String} firClass first background class for button.
     * 
     * @param {String} secClass Second background class for button.
     * 
     * @param {String} thirdClass third background class for button.
     * 
	 * @public
	 */
    this.chooseAllStatusFilter = function(btnFir, btnSec, btnThird, firClass, secClass, thirdClass) {
        btnFir.classList.remove(firClass);
        btnSec.classList.remove(secClass);
        btnThird.classList.remove(thirdClass);
    }

    /**
	 * remove two background classes and add one background class.For buttons on click.
     * 
     * @param {HTMLElement} btnFir first button for remove class.
     * 
     * @param {HTMLElement} btnSec second button for remove class.
     * 
     * @param {HTMLElement} btnThird third button for remove class.
     * 
     * @param {String} firClass first background class for button.
     * 
     * @param {String} secClass Second background class for button.
     * 
     * @param {String} thirdClass third background class for button.
     * 
	 * @public
	 */
    this.chooseStatusFilter = function(btnFir, btnSec, btnThird, firClass, secClass, thirdClass) {
        btnFir.classList.add(firClass);
        btnSec.classList.remove(secClass);
        btnThird.classList.remove(thirdClass);
    }

    /**
	 * remove backgroud classes from status buttons.
     * 
	 * @public
	 */
    this.cleanActivityStatusFilter = function() {
        const btnStatusOK = document.querySelector("[data-status='OK']");
        const btnStatusStorage = document.querySelector("[data-status='STORAGE']");
        const btnStatusStock = document.querySelector("[data-status='OUT_OF_STOCK']");
        btnStatusOK.classList.remove("products-background-OK");
        btnStatusStorage.classList.remove("products-background-Storage");
        btnStatusStock.classList.remove("products-background-Stock");
    }

    /**
	 * filter details by status.
     * 
     * @param {String} status status name.
     * 
	 * @public
	 */
    this.showStatusTableItems = function(status) {
        const tableItems = Array.from(document.querySelectorAll(".store-details-table__item"));
        if(status === undefined) {
            tableItems.forEach((item) => {
                item.classList.remove("hide");
            }); 
        } else {
            tableItems.forEach((item) => {
                item.classList.add("hide");
            }); 
            const sortedItems = tableItems.filter(item => item.dataset.tableitemStatus == status);
            sortedItems.forEach((item) => {
            item.classList.remove("hide");
            });
        }
    }

    /**
	 * render header in table.
     * 
     * @param {HTMLElement} place place for table.
     * 
	 * @public
	 */
    this.renderDetailsTableHeader = function(place) {
        place.innerHTML += `
        <div class="store-details-table__title">
            <h2>Products</h2>
        </div>
        <div class="store-details-table-header">
            <div class="store-details-list-header__item">
                <span>Name</span>
            </div>
            <div class="store-details-list-header__item store-details-list-cap__item-outside">
                <span>Price</span>
            </div>
            <div class="store-details-list-header__item">
                <span>Specs</span>
            </div>
            <div class="store-details-list-header__item">
                <span>SupplierInfo</span>
            </div>
            <div class="store-details-list-header__item">
                <span>Country of origin</span>
            </div>
            <div class="store-details-list-header__item">
                <span>Prod. company</span>
            </div>
            <div class="store-details-list-header__item">
                <span>Rating</span>
            </div>
        </div>
    <div class="store-details-table-content">
    </div>
    `;     
    }

    /**
	 * creating a table with details for current Store.
     * 
     * @param {Object[]} dataItem array details.
     * 
	 * @public
	 */
    this.renderTableItem = function(dataItem) {
        let storeTable = document.querySelector(".store-details-table-content");
        storeTable.innerHTML = "";
        dataItem.forEach((item) => {
            storeTable.innerHTML += `
                <div class="store-details-table__item" data-tableItem-status="${item.Status}">
                    <div class="store-details-table__item-column details-item">
                        <p class="store-details-table__item-head__name">${item.Name}</p>
                        <p class="store-details-table__item-head__id">${item.id}</p>
                    </div>
                    <div class="store-details-table__item-price details-item">
                        <p><span class="table-price-item__currency">${item.Price}</span> USD</p>
                    </div>
                    <div class="details-item">
                        <p>${item.Specs}</p>
                    </div>
                    <div class="details-item">
                        <p>${item.SupplierInfo}</p>
                    </div>
                    <div class="details-item">
                        <p>${item.MadeIn}</p> 
                    </div>
                    <div class="details-item">
                        <p>${item.ProductionCompanyName}</p>
                    </div>
                    <div class="details-item js-rating">
                    </div>
                    <div class="store-details-table-item__arrow">
                        <img src="./img/right-arrow .png" alt="">
                    </div>
                    <div class="details-list-item__cross" data-id ="${item.id}">
                        <img class="img-cross" src="./img/cross.png" alt="">
                    </div>
                </div>
                `;
            let rating = document.querySelectorAll(".js-rating");    
            for (let i = 0; i < item.Rating; i++) {
                rating[rating.length - 1].innerHTML += `
                    <img class="list-item__star" src="./img/fullStar.png" alt="">
                `;
            }
            for (let i = 0; i < 5 - item.Rating; i++) {
                rating[rating.length - 1].innerHTML += `
                    <img class="list-item__star" src="./img/emptyStar.png" alt="">
                `;
            }      
        });
    }

    /**
	 * render footer for table details.
     * 
     * @param {HTMLElement} place place for table.
     * 
	 * @public
	 */
    this.renderDetailsFooter = function(place) {
        place.innerHTML += `
        <footer class="store-list__footer details-list__footer">
            <button class="btn-create btn-details-create">
                <img class="img-create" src="./img/footer-create.png" alt=""> Create
            </button>
            <button class="btn-store-delete">Delete</button>
        </footer>`;
    }

    /**
	 * Get button search.
     * 
     * @returns {HTMLElement}
     * 
	 * @public
	 */
    this.getBtnSearch = function() {
        return document.querySelector(".btn-search");
    };
    /**
	 * clear search input.
     * 
	 * @public
	 */
    this.clearInputSearch = function() {
        document.querySelector(".search-form__input").value = "";
    }
    /**
	 * Get search input value.
     * 
     * @returns {String}
     * 
	 * @public
	 */
    this.getInputSearchValue = function() {
        const input = document.querySelector(".search-form__input");
        return  input.value;
    }
    /**
	 * Get button clear.
     * 
	 * @public
	 */
    this.getInputBtnClear = function() {
        return document.querySelector(".btn-clear");
    }

    /**
	 * Get HTMLElement for table content.
     * 
     * @returns {HTMLElement}
     * 
	 * @public
	 */
    this.getTableContent = function() {
        return document.querySelector(".store-details-table-content");
    }

    /**
	 * Get HTMLElements for Store modal.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtnStoreCreateItems = function() {
        return {
            btnCreate : document.querySelector(".btn-store-create"),
            modalWindow : document.querySelector(".modal-create-stores"),
            modalForm : document.querySelector(".modal-store-form"),
            modalBtnCancel : document.querySelector(".modal-store-btn-cancel"),
            modalBtnCreate : document.querySelector(".modal-store-btn-create")
        }
    }

    /**
	 * Get HTMLElements for detail modal.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtnDetailCreateItems = function() {
        return {
            btnCreate : document.querySelector(".btn-details-create"),
            modalWindow : document.querySelector(".modal-create-details"),
            modalForm : document.querySelector(".modal-details-form"),
            modalBtnCancel : document.querySelector(".modal-details-btn-cancel"),
            modalBtnCreate : document.querySelector(".modal-details-btn-create")
        }
    }

    /**
	 * Get HTMLElements for delete Store modal.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtnStoreDeleteItems = function() {
        return {
            btnDelete : document.querySelector(".btn-store-delete"),
            modalWindow : document.querySelector(".modal-confirmation-store"),
            modalBtnOK : document.querySelector(".modal-store-confirmation__btn-OK"),
            modalBtnCancel : document.querySelector(".modal-store-confirmation__btn-cancel")
        }
    }

    /**
	 * Get HTMLElements for confirmation modal.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getBtnDetailDeleteItems = function() {
        return {
            modalWindow : document.querySelector(".modal-confirmation-detail"),
            modalBtnOK : document.querySelector(".modal-detail-confirmation__btn-OK"),
            modalBtnCancel : document.querySelector(".modal-detail-confirmation__btn-cancel")
        }
    }

    /**
	 * Check HTMLElement of accessory
     * @param {HTMLElement} event
     * @returns {Object}
     * 
	 * @public
	 */
    this.checkDeleteDetail = (event) => {
        if(event.target && event.target.classList.contains("img-cross")) {
            return event.target.closest("div").dataset.id;
        } else {
            return false;
        }
    }

    /**
	 * Get store inputs in modal window.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getNodalStoreInp = function() {
        return {
            "Name": document.querySelector(".modal-store-name-inp"),
            "Email": document.querySelector(".modal-store-email-inp"),
            "PhoneNumber": document.querySelector(".modal-store-phoneNunber-inp"),
            "Address": document.querySelector(".modal-store-address-inp"),
            "Established": document.querySelector(".modal-store-established-inp"),
            "FloorArea": document.querySelector(".modal-store-floorArea-inp")
        }
    }

    /**
	 * Get store inputs values in modal window.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getModalStoreInpValue = function() {
        return {
            "Name": document.querySelector(".modal-store-name-inp").value,
            "Email": document.querySelector(".modal-store-email-inp").value,
            "PhoneNumber": document.querySelector(".modal-store-phoneNunber-inp").value,
            "Address": document.querySelector(".modal-store-address-inp").value,
            "Established": document.querySelector(".modal-store-established-inp").value,
            "FloorArea": Number(document.querySelector(".modal-store-floorArea-inp").value)
        }
    }

    /**
	 * Get detail inputs in modal window.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getModalDetailsInp = () => {
        return {
            "Name": document.querySelector(".modal-detail-name-inp"),
            "Price": document.querySelector(".modal-detail-price-inp"),
            "Photo": "string",
            "Specs": document.querySelector(".modal-detail-specs-inp"),
            "Rating": document.querySelector(".modal-detail-rating-inp"),
            "SupplierInfo": document.querySelector(".modal-detail-supplierInfo-inp"),
            "MadeIn": document.querySelector(".modal-detail-madePlace-inp"),
            "ProductionCompanyName": document.querySelector(".modal-detail-companyName-inp"),
            "Status": document.querySelector("#modal-status-product"),
        }
    }

    /**
	 * Get detail inputs value in modal window.
     * 
     * @returns {Object}
     * 
	 * @public
	 */
    this.getModalDetailsInpValue = () => {
        return {
            "Name": document.querySelector(".modal-detail-name-inp").value,
            "Price": Number(document.querySelector(".modal-detail-price-inp").value),
            "Photo": "string",
            "Specs": document.querySelector(".modal-detail-specs-inp").value,
            "Rating": Number(document.querySelector(".modal-detail-rating-inp").value),
            "SupplierInfo": document.querySelector(".modal-detail-supplierInfo-inp").value,
            "MadeIn": document.querySelector(".modal-detail-madePlace-inp").value,
            "ProductionCompanyName": document.querySelector(".modal-detail-companyName-inp").value,
            "Status": document.querySelector("#modal-status-product").value,
            "StoreId": Number(this.getStoreId())
        }
    }

    /**
	 * Find out Store id.
     * 
     * @returns {String} Store id
     * 
	 * @public
	 */
    this.getStoreId = function() {
        const storeItems = document.querySelectorAll(".store-list__item");
        for(let i = 0;i < storeItems.length;i++) {
            if(storeItems[i].classList.contains("js-list-item-active")) {
                return storeItems[i].dataset.id;
            }
        }
    }

    /**
	 * closes the window if user clicks outside the window and reset form values.
     * 
     * @param {HTMLElement} event 
     * 
     * @param {HTMLElement} modalWindow
     * 
     * @param {HTMLElement} modalForm form by modal
     * 
	 * @public
	 */
    this.missModalWindow = (event,modalWindow, modalForm) => {
        if(event.target === modalWindow) {
            this.closeAndResetModal(modalWindow, modalForm);
        }
    }

    /**
	 * closes the window if user clicks outside the window.
     * 
     * @param {HTMLElement} event 
     * 
     * @param {HTMLElement} modalWindow
     * 
	 * @public
	 */
    this.missModalConfirmation = (event, modalWindow) => {
        if(event.target === modalWindow) {
            this.closeModal(modalWindow);
        }
    }

    /**
	 * closes the modal window and reset form values.
     * 
     * @param {HTMLElement} modalWindow
     * 
     * @param {HTMLElement} modalForm form by modal
     * 
	 * @public
	 */
    this.closeAndResetModal = (modalWindow, modalForm) => {
        this.closeModal(modalWindow);
        this.resetForm(modalForm);
    }

    /**
	 * reset form values.
     * 
     * @param {HTMLElement} modalForm form by modal
     * 
	 * @public
	 */
    this.resetForm = function(form) {
        form.querySelectorAll("input").forEach(item => {
            item.value = "";
        });
        form.querySelectorAll("textarea").forEach(item => {
            item.value = "";
        });
    }

    /**
	 * change some classes to show modal window.
     * 
     * @param {HTMLElement} modalWin
     * 
	 * @public
	 */
    this.openModal = function(modalWin) {
        modalWin.classList.add("show");
        modalWin.classList.remove("hide");
        document.body.style.overflow = "hidden";
    }

    /**
	 * change some classes to hide modal window.
     * 
     * @param {HTMLElement} modalWin
     * 
	 * @public
	 */
    this.closeModal = function(modalWin) {
        modalWin.classList.add("hide");
        modalWin.classList.remove("show");
        document.body.style.overflow = "";
    }

    /**
	 * highlight the input if the data is entered incorrectly
     * 
     * @param {HTMLInputElement} item input element
     * 
	 * @public
	 */
    this.incorrectData = function(item) {
        item.classList.add("wrong-data");
        item.closest("div").classList.add("wrong-input");
    }

    /**
	 * delete selection input 
     * 
     * @param {HTMLInputElement} item input element
     * 
	 * @public
	 */
    this.removeIncorrectMessage = function(item) {
        item.classList.remove("wrong-data");
        item.closest("div").classList.remove("wrong-input");
    }

}