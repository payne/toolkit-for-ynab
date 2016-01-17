(function poll() {
  if ( typeof ynabToolKit !== "undefined" && ynabToolKit.actOnChangeInit === true ) {

    ynabToolKit.featureOptions.insertBalanceColumns = true;
    ynabToolKit.insertBalanceColumns = function ()  {

		function  formatCurrency(e, html) {
		  var n, r, a;
		  e = ynab.formatCurrency(e);
		  n = ynab.YNABSharedLib.currencyFormatter.getCurrency();
		  a = Ember.Handlebars.Utils.escapeExpression(n.currency_symbol);
		  if (html) {
		      a = '<bdi>' + a + '</bdi>';
		  }
		  n.symbol_first ? (r = '-' === e.charAt(0), e = r ? '-' + a + e.slice(1) : a + e) : e += a;
		  return new Ember.Handlebars.SafeString(e);
		}

		// Calculate the proportion of the month that has been spent -- only works for the current month
		function timeSpent() {
		  var today = new Date();
		  var daysInMonth = new Date(today.getYear(), today.getMonth(), 0).getDate();
		  var day = Math.max(today.getDate()-1,1);

		  return day/daysInMonth;
		}

		var tv = ynab.YNABSharedLib.getBudgetViewModel_AllBudgetMonthsViewModel()._result.getAllAccountTransactionsViewModel();
		var month = tv.getBudgetMonthViewModelForCurrentMonth().getMonth();
		var allTransactions = tv.getVisibleTransactionDisplayItemsForMonth(month);

	  // Make room for the column
	  $('#ynab-toolkit-balance-style').remove();
	  $('<style type="text/css" id="ynab-toolkit-balance-style"> .accounts-cell-available { width: 10% !important; } </style>').appendTo('head');

		$('.accounts-table-cell-balance').remove()

		$(".accounts-header .accounts-cell-available").after($('<li class="accounts-cell-balance"><strong>Balance</strong></li>'));

		$('.ynab-grid-body-row').each(function(){
		  var available = ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.accounts-cell-available').text());
		  var activity = -ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.accounts-cell-activity').text());
		  var budgeted = available+activity;
		  var burned = activity/budgeted;
		  var pace = burned/timeSpent();

		  var masterName = $.trim($(this).prevAll('.is-master-category').first().find('.accounts-cell-name').text());
		  var subcatName = $.trim($(this).find('.accounts-cell-name').text());

		  var transactionCount = allTransactions.filter((el) => el.transferAccountId == null
		    && el.outflow > 0 && el.subCategoryNameWrapped == (masterName+": "+subcatName)).length;

		  var displayType = 'dollars';
      $(this).append('<div class="ynab-grid-cell><span class="user-data currency">42.42</span></div>"');
		  }
		});

	};
	ynabToolKit.insertBalanceColumns();



  } else {
    setTimeout(poll, 250);
  }
})();
