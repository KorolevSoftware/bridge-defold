let js_bridge_advertisement = {
    // #region Banner
    js_bridge_advertisement_isBannerSupported: function () {
        return bridge.advertisement.isBannerSupported;
    },

    js_bridge_advertisement_showBanner: function (options) {
        const objOtions = JSON.parse(UTF8ToString(options));
        bridge.advertisement.showBanner(objOtions);
    },

    js_bridge_advertisement_bannerState: function() {
        return CStrOrNull(bridge.advertisement.bannerState);
    },

    js_bridge_advertisement_on: function (handler, event_name, callback) {
        bridge.advertisement.on(UTF8ToString(event_name), state => {
            {{{ makeDynCall('vii', 'handler') }}} (callback, packToJson(state));
        });
    },

    js_bridge_advertisement_hideBanner: function() {
        bridge.advertisement.hideBanner();
    },
    // #endregion

    // #region Interstitial
    js_bridge_advertisement_minimumDelayBetweenInterstitial: function() {
        return bridge.advertisement.minimumDelayBetweenInterstitial;
    },

    js_bridge_advertisement_setMinimumDelayBetweenInterstitial: function(delay) {
        bridge.advertisement.setMinimumDelayBetweenInterstitial(delay);
    },

    js_bridge_advertisement_interstitialState: function() {
        return CStrOrNull(bridge.advertisement.interstitialState);
    },

    js_bridge_advertisement_showInterstitial: function() {
        bridge.advertisement.showInterstitial();
    },
    // #endregion

    // #region Rewarded
    js_bridge_advertisement_rewardedState: function() {
        return CStrOrNull(bridge.advertisement.rewardedState);
    },

    js_bridge_advertisement_showRewarded: function() {
        bridge.advertisement.showRewarded();
    },

    js_bridge_advertisement_checkAdBlock: function(handler, onSuccess, onFailure) {
        bridge.advertisement.checkAdBlock()
            .then(result => {
                {{{ makeDynCall('viiii', 'handler') }}} (onSuccess, onFailure, 0, packToJson(result));
            })
            .catch(error => {
                {{{ makeDynCall('viiii', 'handler') }}} (onSuccess, onFailure, 1, packToJson(error));
            });
    }
    // #endregion
}

mergeInto(LibraryManager.library, js_bridge_advertisement);