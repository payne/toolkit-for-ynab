// ==UserScript==
// @name Main
// @include http://*.youneedabudget.com/*
// @include https://*.youneedabudget.com/*
// ==/UserScript==

function injectCSS(path) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  link.setAttribute('href', kango.io.getResourceUrl(path));

  document.getElementsByTagName('head')[0].appendChild(link);
}

function injectScript(path) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', kango.io.getResourceUrl(path));

  document.getElementsByTagName('body')[0].appendChild(script);
}

/* Load this to setup shared utility functions */
injectScript('res/features/shared/main.js');

/* Load this to setup behaviors when the DOM updates and shared functions */
injectScript('res/features/act-on-change/main.js');

function ensureDefaultsAreSet() {
  var storedKeys = kango.storage.getKeys();

  if (storedKeys.indexOf('collapseExpandBudgetGroups') < 0) {
    kango.storage.setItem('collapseExpandBudgetGroups', true);
  }

  if (storedKeys.indexOf('enableRetroCalculator') < 0) {
    kango.storage.setItem('enableRetroCalculator', true);
  }

  if (storedKeys.indexOf('removeZeroCategories') < 0) {
    kango.storage.setItem('removeZeroCategories', true);
  }
}

ensureDefaultsAreSet();

// Global toolkit css.
injectCSS('res/features/main.css');

if (kango.storage.getItem('collapseExpandBudgetGroups')) {
  injectCSS('res/features/collapse-budget-groups/main.css');
  injectScript('res/features/collapse-budget-groups/main.js');
}

if (kango.storage.getItem('collapseSideMenu')) {
  injectCSS('res/features/collapse-side-menu/main.css');
  injectScript('res/features/collapse-side-menu/main.js');
}

if (kango.storage.getItem('colourBlindMode')) {
  injectCSS('res/features/colour-blind-mode/main.css');
}

if (kango.storage.getItem('hideAOM')) {
  injectCSS('res/features/hide-age-of-money/main.css');
}

if (kango.storage.getItem('highlightNegativesNegative')) {
  injectScript('res/features/highlight-negatives-negative/main.js');
}

if (kango.storage.getItem('checkCreditBalances')) {
  injectScript('res/features/check-credit-balances/main.js');
}

if (kango.storage.getItem('checkCreditBalances') || kango.storage.getItem('highlightNegativesNegative')) {
  // features that update presentation classes should have this enabled by default for consistency
  injectScript('res/features/inspector-colours/main.js');
}

if (kango.storage.getItem('enableRetroCalculator')) {
  injectScript('res/features/ynab-4-calculator/main.js');
}

if (kango.storage.getItem('removeZeroCategories')) {
  injectScript('res/features/remove-zero-categories/main.js');
}

if (kango.storage.getItem('budgetRowsHeight') == 1) {
  injectCSS('res/features/budget-rows-height/compact.css');
}
else if (kango.storage.getItem('budgetRowsHeight') == 2) {
  injectCSS('res/features/budget-rows-height/slim.css');
}

if (kango.storage.getItem('categoryActivityPopupWidth') == 1) {
  injectCSS('res/features/category-activity-popup-width/medium.css');
}
else if (kango.storage.getItem('categoryActivityPopupWidth') == 2) {
  injectCSS('res/features/category-activity-popup-width/large.css');
}

if (kango.storage.getItem('moveMoneyDialog')) {
  injectCSS('res/features/move-money-dialog/main.css');
}

if (kango.storage.getItem('moveMoneyAutocomplete')) {
  injectCSS('res/features/move-money-autocomplete/main.css');
  injectScript('res/features/move-money-autocomplete/main.js');
}

if (kango.storage.getItem('toggleSplits')) {
  injectScript('res/features/toggle-splits/main.js');
}

if (kango.storage.getItem('toggleBalance')) {
  injectScript('res/features/balance/main.js');
}

if (kango.storage.getItem('accountsSelectedTotal')) {
  injectCSS('res/features/accounts-selected-total/main.css');
  injectScript('res/features/accounts-selected-total/main.js');
}

if (kango.storage.getItem('changeEnterBehavior')) {
  injectScript('res/features/change-enter-behavior/main.js');
}

if (kango.storage.getItem('transferJump')) {
  injectCSS('res/features/transfer-jump/main.css');
  injectScript('res/features/transfer-jump/main.js');
}

if (kango.storage.getItem('pacing')) {
  injectCSS('res/features/pacing/pacing.css');
  injectScript('res/features/pacing/main.js');
}

if (kango.storage.getItem('reconciledTextColor')) {
  injectScript('res/features/distinguish-reconciled-transactions/main.js');
}

if (kango.storage.getItem('reconciledTextColor') == 1) {
  injectCSS('res/features/distinguish-reconciled-transactions/green.css');
}
else if (kango.storage.getItem('reconciledTextColor') == 2) {
  injectCSS('res/features/distinguish-reconciled-transactions/lightgray.css');
}
else if (kango.storage.getItem('reconciledTextColor') == 3) {
  injectCSS('res/features/distinguish-reconciled-transactions/darkgray.css');
}
else if (kango.storage.getItem('reconciledTextColor') == 4) {
  injectCSS('res/features/distinguish-reconciled-transactions/chance.css');
}

if (kango.storage.getItem('accountsDisplayDensity') == 1) {
  injectCSS('res/features/accounts-display-density/compact.css');
}
else if (kango.storage.getItem('accountsDisplayDensity') == 2) {
  injectCSS('res/features/accounts-display-density/slim.css');
}

if (kango.storage.getItem('editButtonPosition') == 1) {
  injectCSS('res/features/edit-button-position/left.css');
}
else if (kango.storage.getItem('editButtonPosition') == 2) {
  injectCSS('res/features/edit-button-position/hidden.css');
}

if (kango.storage.getItem('daysOfBuffering')) {
  injectCSS('res/features/days-of-buffering/main.css');
  injectScript('res/features/days-of-buffering/main.js');
}

if (kango.storage.getItem('removePositiveHighlight')) {
  injectCSS('res/features/remove-positive-highlight/main.css');
}
