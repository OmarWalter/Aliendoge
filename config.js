/**
 * Olympus Asteroid — mainnet dapp configuration.
 * After deployment, replace token and staking with your verified addresses.
 */
(function () {
  window.OAM_CHAIN_ID = 1;

  /** @type {string} OlimpusAsteroidToken */
  window.OAM_TOKEN_ADDRESS = "0x8e2692b59196f444213A31b21311427D2B4c5C79";

  /** @type {string} OamStakingLocked */
  window.OAM_STAKING_ADDRESS = "0xB5836049781e9f3365533C05864F7E6F376Ee8B2";

  /** Official links (edit to your real URLs). */
  window.OAM_SOCIAL = {
    twitter: "https://x.com/aliendogeeth",
    telegram: "https://t.me/aliendogePortal",
  };

  window.getOamAddresses = function getOamAddresses() {
    return {
      token: String(window.OAM_TOKEN_ADDRESS || "").trim(),
      staking: String(window.OAM_STAKING_ADDRESS || "").trim(),
    };
  };
})();
