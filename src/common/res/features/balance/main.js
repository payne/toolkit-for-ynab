(function poll() {
  if ( typeof ynabToolKit !== "undefined" && ynabToolKit.actOnChangeInit === true ) {

    ynabToolKit.featureOptions.insertBalanceColumns = true;
    ynabToolKit.insertBalanceColumns = function ()  {
	  // Make room for the column
	  $('#ynab-toolkit-balance-style').remove();
	  $('<style type="text/css" id="ynab-toolkit-balance-style"> .accounts-cell-available { width: 10% !important; } </style>').appendTo('head');

		$('.accounts-table-cell-balance').remove()

		$(".accounts-header .accounts-cell-available").after($('<li class="accounts-cell-balance"><strong>Balance</strong></li>'));
    console.log('Looking for rows to loop over');
		console.log('length='+ $('.ynab-grid-body-row').size());
		$('.ynab-grid-body-row').each(function(){
	//	  var available = ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.accounts-cell-available').text());
		  var displayType = 'dollars';
      $(this).append('<div class="matt ynab-grid-cell><span class="user-data currency">42.42</span></div>');
      console.log('Matt adding column');
		});
	};
  console.log("About to call insertBalanceColumns");
	ynabToolKit.insertBalanceColumns();
  } else {
    setTimeout(poll, 250);
  }
})();
