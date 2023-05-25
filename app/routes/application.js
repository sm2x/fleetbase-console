import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import isElectron from '@fleetbase/ember-core/utils/is-electron';
import pathToRoute from '@fleetbase/ember-core/utils/path-to-route';

export default class ApplicationRoute extends Route {
    @service session;
    @service theme;
    // @service intl;
    @service urlSearchParams;
    @service modalsManager;

    /**
     * Sets up session and handles redirects
     *
     * @param {Transition} transition
     * @return {Transition}
     * @memberof ApplicationRoute
     */
    async beforeModel() {
        await this.session.setup();

        const { isAuthenticated } = this.session;
        const shift = this.urlSearchParams.get('shift');

        if (isAuthenticated && shift) {
            return this.transitionTo(pathToRoute(shift));
        }
    }

    /**
     * On application route activation
     *
     * @memberof ApplicationRoute
     * @void
     */
    activate() {
        const bodyClassNames = [];

        if (isElectron()) {
            bodyClassNames.pushObject(['is-electron']);
        }

        this.theme.initialize({ bodyClassNames });
        // this.intl.setLocale(['en-us']);
    }
}
