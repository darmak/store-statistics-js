/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
function Model() {
    /**
	 * URL template for getting the Stores from server.
	 * @type {string}
	 *
	 * @private
	 */
    const _StoresURL = "http://localhost:3000/api/Stores";
    /**
	 * URL template for getting the Products from server.
	 * @type {string}
	 *
	 * @private
	 */
    const _ProductsURL = "http://localhost:3000/api/Products";

    /**
	 * Fetch the Stores array.
	 *
	 * @returns {Promise} 
	 *
	 * @public
	 */
    this.fetchAllStores = function() {
        return fetch(_StoresURL)
                .then(response => response.json())
    }
    /**
	 * Fetch the Products array.
	 *
	 * @returns {Promise} 
	 *
	 * @public
	 */
    this.fetchStoreItemDetails = function() {
        return fetch(_ProductsURL)
                .then(response => response.json())
    }

    /**
	 * Fetch the order object by id.
	 *
	 * @param {Object} item the choosed Store.
	 *
	 * @returns {Promise} 
	 *
	 * @public
	 */
    this.fetchStoreItemDetailsFilter = function(item) {
        return fetch(_ProductsURL)
                    .then(response => response.json())
                    .then(json => {
                        return json.filter(function(itemProd) {
                            if(item.id == itemProd.StoreId) {
                                return true;
                            } else {
                                return false;
                            }
                        })
                    })
    }

    /**
	 * Post new Store.
	 *
	 * @param {Object} data the new Store.
	 *
	 * @public
	 */
    this.postStoreItem = function(data) {
        fetch(_StoresURL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
                }, 
            body: JSON.stringify(data)
            })
    }

    /**
	 * Post new Detail for Store.
	 *
	 * @param {Object} data the new Detail.
	 *
	 * @public
	 */
    this.postDetailItem = function(data) {
        fetch(_ProductsURL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
                }, 
            body: JSON.stringify(data)
            })
    }

    /**
	 * Delete the Store by id.
	 *
	 * @param {Number} StoreId the choosed Store.
	 *
	 * @public
	 */
    this.deleteStoreItem = function(StoreId) {
        fetch(`${_StoresURL}/${StoreId}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
                }, 
            body: JSON.stringify({
                "count": 0
              })
            })
    }

    /**
	 * Delete the Detail by id.
	 *
	 * @param {Number} Id the choosed Store.
	 *
	 * @public
	 */
    this.deleteDetailItem = function(Id) {
        fetch(`${_ProductsURL}/${Id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
                }, 
            body: JSON.stringify({
                "count": 0
              })
            })
    }

    /**
	 *
	 * @param {Promise} fetch the promise for getting Stores.
     * 
     * @param {string} inpValue the query value search .
	 *
	 * @return {Promise}
	 *
	 * @public
	 */
    this.storeListFilter = function (fetch, inpValue) {
        inpValue = inpValue.toLowerCase();
        return fetch()
                .then(data => {
                    return data.filter(function(item) {
                            if(item.Name.toLowerCase().indexOf(inpValue) >= 0) {
                                return true;
                            } else if(item.Address.toLowerCase().indexOf(inpValue) >= 0) {
                                return true;
                            } else if(String(item.FloorArea).toLowerCase().indexOf(inpValue) >= 0) {
                                return true;
                            } else {
                                return false;
                            }   
                        })
                })
    }

    /**
	 * @param {String} number the for check input rating.
	 *
	 * @return {Boolean}
	 *
	 * @public
	 */
    this.validateRating = function(number) {
        if(number >= 0 && number <= 5) {
            return true;
        } else {
            return false;
        }
    }

    /**
	 * @param {String} number the for check input floor area.
	 *
	 * @return {Boolean}
	 *
	 * @public
	 */
    this.validateFloorArea = function(number) {
        if(number.length == 0 || isNaN(Number(number))) {
            return false;
        } else {
            return true;
        } 
    }

    /**
	 * @param {String} number the for check input email.
	 *
	 * @return {Boolean}
	 *
	 * @public
	 */
    this.validateEmail = function(email) {
        if(!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(email)) {
            let checkNum = 0;
            for(let i = 0;i < email.length;i++) {
                if(!isNaN(Number(email[i]))) {
                    checkNum++;
                }
            }
            if(checkNum != email.length-2) {
                if(email.indexOf("@") != -1) {
                    return true;
                } else {
                    return false;
                }
        
            } else {
                return false;
            }
    
        } else {
            return false;
        }
    }
}