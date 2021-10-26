/**
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
function Controller(view, model) {
    /**
	 * Initialize controller.
	 *
	 * @public
	 */
    this.init = function() {
        model.fetchAllStores()
            .then(json => view.renderStoresList(json));
        const btnSearch = view.getBtnSearch();
        const btnClear = view.getInputBtnClear();
        const StoresList = document.querySelector(".store-list-content");
        StoresList.addEventListener('click', this._onStoreListItemClick);
        btnClear.addEventListener('click', this._onClearBtnClick);
        btnSearch.addEventListener('click', this._onSearchBtnClick);
        this._listenerBtnStoreCreate();
        this._listenerStoreDetails();
    };

    /**
	 * Filter Store list and show his.
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._onSearchBtnClick = function() {
        const value = view.getInputSearchValue();
        model.storeListFilter(model.fetchAllStores, value)
            .then(sort => view.renderStoresList(sort));
    }

    /**
	 * Clear search input and show all Stores.
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._onClearBtnClick = function() {
        view.clearInputSearch();
        model.fetchAllStores()
            .then(json => view.renderStoresList(json));
    }

    /**
	 * Render details table and show all information about this.
	 *
	 * @listens click
	 *
	 * @param {Event} e the DOM event object.
	 *
	 * @private
	 */
    this._onStoreListItemClick = (event) => {
        if(event.target && view.getChooseStoreItem(event)) {
            let currentItem = view.getCurrentItem(event);
            view.makeActiveStoreItem(currentItem);
            model.fetchAllStores()
                .then(json => {
                    for(let i = 0;i < json.length;i++) {
                        if(json[i].id == currentItem.dataset.id) {
                            const detailsTable = document.querySelector(".default-data");
                            fetch("http://localhost:3000/api/Products")
                            .then(response => response.json())
                            .then(jsonList => {
                                return jsonList.filter(function(itemProd) {
                                    if(json[i].id == itemProd.StoreId) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                })
                            })
                            .then(data => {
                                if(detailsTable) {
                                view.makeStoreTable(detailsTable);
                                view.renderStoreDetailsHeader(detailsTable, json[i]);
                                view.renderStatusFilter(detailsTable, data);
                                view.renderDetailsTableHeader(detailsTable);
                                view.renderTableItem(data);
                                view.renderDetailsFooter(detailsTable);
                                const btns = view.getBtns();
                                btns.btnStatusAll.addEventListener('click', this._btnAllStatusStyleChange);
                                btns.btnStatusOK.addEventListener('click', this._btnOkStatusStyleChange);
                                btns.btnStatusStorage.addEventListener('click',this._btnStorageStatusStyleChange);
                                btns.btnStatusStock.addEventListener('click',this._btnStockStatusStyleChange);
                                } 
                                else {
                                    view.renderTableItem(data);
                                    view.updateStatusFilter(data);
                                    view.updateContactsData(json[i]);
                                    view.cleanActivityStatusFilter();
                                }
                            })
                        }
                    }
                })
        }
    }

    /**
	 * remove status background when click on button.
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._btnAllStatusStyleChange = function() {
        const btnBg = view.getBtnsBgClass();
        const btns = view.getBtns();
        view.chooseAllStatusFilter(btns.btnStatusOK, btns.btnStatusStorage, btns.btnStatusStock, btnBg.bgOK,btnBg.bgStorage, btnBg.bgStock);
        view.showStatusTableItems();
    }
    /**
	 * Highlight choosed status button 
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._btnOkStatusStyleChange = function() {
        const btnBg = view.getBtnsBgClass();
        const btns = view.getBtns();
        view.chooseStatusFilter(btns.btnStatusOK, btns.btnStatusStorage,
                                btns.btnStatusStock, btnBg.bgOK,
                                btnBg.bgStorage, btnBg.bgStock);
        view.showStatusTableItems("OK");
    }

    /**
	 * Highlight choosed status button 
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._btnStorageStatusStyleChange = function() {
        const btnBg = view.getBtnsBgClass();
        const btns = view.getBtns();
        view.chooseStatusFilter(btns.btnStatusStorage, btns.btnStatusOK, 
                                btns.btnStatusStock, btnBg.bgStorage, 
                                btnBg.bgOK, btnBg.bgStock);
        view.showStatusTableItems("STORAGE");
    }

    /**
	 * Highlight choosed status button 
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._btnStockStatusStyleChange = function() {
        const btnBg = view.getBtnsBgClass();
        const btns = view.getBtns();
        view.chooseStatusFilter(btns.btnStatusStock, btns.btnStatusOK, 
                                btns.btnStatusStorage, btnBg.bgStock, 
                                btnBg.bgOK, btnBg.bgStorage);
        view.showStatusTableItems("OUT_OF_STOCK");
    }

    /**
	 * When the table is created all interactions with the table are created
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._listenerBtnStoreCreate = () => {
        btnCreateItems = view.getBtnStoreCreateItems();
        btnCreateItems.btnCreate.addEventListener('click',() => {
            view.openModal(btnCreateItems.modalWindow);
        });
        btnCreateItems.modalWindow.addEventListener('click', (event) => {
            view.missModalWindow(event, btnCreateItems.modalWindow, btnCreateItems.modalForm);
        });
        btnCreateItems.modalBtnCancel.addEventListener('click', () => {
            view.closeAndResetModal(btnCreateItems.modalWindow, btnCreateItems.modalForm);
        });
        btnCreateItems.modalBtnCreate.addEventListener('click', () => { 
            const Inputs = view.getNodalStoreInp();
            const InputsValue = view.getModalStoreInpValue();
            let check = 0;
            if (model.validateFloorArea(InputsValue.FloorArea)) {
                check++;
            } else {
                view.incorrectData(Inputs.FloorArea);
                setTimeout(()=>{
                    view.removeIncorrectMessage(Inputs.FloorArea);
                },5000)
            }
            if(model.validateEmail(InputsValue.Email)) {
                check++;
            } else {
                view.incorrectData(Inputs.Email);
                setTimeout(()=>{
                    view.removeIncorrectMessage(Inputs.Email);
                },5000)
            }
            if(check === 2) {
                model.postStoreItem(InputsValue);
                view.closeAndResetModal(btnCreateItems.modalWindow, btnCreateItems.modalForm);
            }
        });
    }

    /**
	 * Highlight choosed status button 
	 *
	 * @listens click
	 *
	 * @private
	 */
    this._listenerStoreDetails = function() {
        const timerDetails = setInterval(() => {
            if(view.getDetailsTable()) {
                const btnDetailsCreateItems = view.getBtnDetailCreateItems();
                const btnStoreDeleteItems = view.getBtnStoreDeleteItems();
                const tableContent = view.getDetailsTable();
                const btnDetailsDeleteItems = view.getBtnDetailDeleteItems();
                let deleteId = null;
                btnDetailsCreateItems.btnCreate.addEventListener('click', () => {
                    view.openModal(btnDetailsCreateItems.modalWindow);
                });
                btnDetailsCreateItems.modalWindow.addEventListener('click', (event) => {
                    view.missModalWindow(event, btnDetailsCreateItems.modalWindow, btnDetailsCreateItems.modalForm);
                });
                btnDetailsCreateItems.modalBtnCreate.addEventListener('click', () => {
                    const Inputs = view.getModalDetailsInp();
                    const InputsValue = view.getModalDetailsInpValue();
                    let check = 0;
                    if (model.validateRating(InputsValue.Rating)) {
                        check++;
                    } else {
                        view.incorrectData(Inputs.Rating);
                        setTimeout(()=>{
                            view.removeIncorrectMessage(Inputs.Rating);
                        },5000)
                    }
                    if(check === 1) {
                        model.postDetailItem(view.getModalDetailsInpValue());
                        view.closeAndResetModal(btnDetailsCreateItems.modalWindow, btnDetailsCreateItems.modalForm);
                    }
                });
                btnDetailsCreateItems.modalBtnCancel.addEventListener('click', () => {
                    view.closeAndResetModal(btnDetailsCreateItems.modalWindow, btnDetailsCreateItems.modalForm);
                });
                btnStoreDeleteItems.btnDelete.addEventListener('click', () => {
                    view.openModal(btnStoreDeleteItems.modalWindow);
                });
                btnStoreDeleteItems.modalWindow.addEventListener('click', (event) => {
                    view.missModalConfirmation(event, btnStoreDeleteItems.modalWindow);
                });
                btnStoreDeleteItems.modalBtnOK.addEventListener('click', () => {
                    model.deleteStoreItem(view.getStoreId());
                    view.closeModal(btnStoreDeleteItems.modalWindow);
                });
                btnStoreDeleteItems.modalBtnCancel.addEventListener('click', () => {
                    view.closeModal(btnStoreDeleteItems.modalWindow);
                });
                tableContent.addEventListener('click', (event) => {
                    deleteId = view.checkDeleteDetail(event);
                    if(deleteId != false) {
                        view.openModal(btnDetailsDeleteItems.modalWindow);
                    }
                });
                btnDetailsDeleteItems.modalWindow.addEventListener('click', (event) => {
                    view.missModalConfirmation(event, btnDetailsDeleteItems.modalWindow);
                });
                btnDetailsDeleteItems.modalBtnOK.addEventListener('click', () => {
                    model.deleteDetailItem(deleteId);
                    view.closeModal(btnDetailsDeleteItems.modalWindow);
                });
                btnDetailsDeleteItems.modalBtnCancel.addEventListener('click', () => {
                    view.closeModal(btnDetailsDeleteItems.modalWindow);
                });
                clearInterval(timerDetails);
            }
        });
    }
}

(new Controller(new View(), new Model())).init();
