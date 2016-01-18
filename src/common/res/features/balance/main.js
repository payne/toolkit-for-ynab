(function poll() {
  if ( typeof ynabToolKit !== "undefined" && ynabToolKit.actOnChangeInit === true ) {

    console.log('starting balance main.js');
    ynabToolKit.featureOptions.insertBalanceColumns = true;
    ynabToolKit.insertBalanceColumns = function ()  {
	  // Make room for the column
	  //$('#ynab-toolkit-balance-style').remove();
	  //$('<style type="text/css" id="ynab-toolkit-balance-style"> .accounts-cell-available { width: 10% !important; } </style>').appendTo('head');

		//$('.accounts-table-cell-balance').remove()

		$(".accounts-header .accounts-cell-available").after($('<li class="accounts-cell-balance"><strong>Balance</strong></li>'));
    console.log('Looking for rows to loop over');
		console.log('length='+ $('.ynab-grid-body-row').size());
    var balance = 0;
		$('.ynab-grid-body-row').each(function(){
	//	  var available = ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.accounts-cell-available').text());
		  //var displayType = 'dollars';
      console.log('this='+$(this));
      var outflow = ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.ynab-grid-cell-outflow').text());
      var inflow = ynab.YNABSharedLib.defaultInstance.currencyFormatter.unformat($(this).find('.ynab-grid-cell-inflow').text());
      $(this).append('<div class="matt ynab-grid-cell><span class="user-data currency">' + balance + '</span></div>');
      balance = balance + (inflow - outflow);
      console.log('Matt adding column balance='+balance+' inflow='+inflow+' outflow='+outflow);
		});
	};
  console.log("About to call insertBalanceColumns");
	ynabToolKit.insertBalanceColumns();
  } else {
    console.log('setTimeout(poll,250);')
    setTimeout(poll, 250);
  }
})();
