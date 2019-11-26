/**
 * Store switching class.
 *
 * @class Store
 */
class Store {
    /**
     * Creates an instance of Store.
     *
     * @memberof Store
     */
    constructor() {
        this.isIE11 = Boolean(window.MSInputMethodContext) && Boolean(document.documentMode);
        this.state = {
            store: null,
            view: null
        };
    }

    /**
     * Gets the correct store library for IE11.
     *
     * @memberof Store
     */
    async getStoreLib() {
        if (this.state.store === null && this.state.view === null) {
            if (!this.isIE11) {
                const {store, view} = await import(
                    /* webpackMode: "lazy" */
                    /* webpackChunkName: "react-easy-state" */
                    'react-easy-state'
                );

                this.state.store = store;
                this.state.view = view;
            } else {
                const {store, view} = await import(
                    /* webpackMode: "lazy" */
                    /* webpackChunkName: "View" */
                    '@nfq/react-easy-state-fallback'
                );

                this.state.store = store;
                this.state.view = view;
            }
        }
    }

    /**
     * Call store function from package.
     *
     * @param {Object} obj The Object to transform.
     * @returns {Proxy} An fallback proxy object.
     * @memberof Store
     */
    store(obj) {
        return this.state.store(obj);
    }

    /**
     * Wrap component in view.
     *
     * @param {Object} comp The component to wrap.
     * @param {Array}  list The store list to listen on.
     * @returns {Object} The wrapped component.
     * @memberof Store
     */
    view(comp, list) {
        return this.state.view(comp, list);
    }
}

export default new Store();