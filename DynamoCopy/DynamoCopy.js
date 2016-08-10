// consoleやalertの使用を許可
/*jslint devel: true*/
// ++の使用を許可
/*jslint plusplus: true*/
// 自由なインデントを許可
/*jslint white: true*/
// 他のファイルで定義済みのオブジェクトの使用を許可
/*global
	require: false,
	exports: false
*/

/* input sample
{
	"source_table_name": "SourceTable",
	"dest_table_name": "DestTable"
}
*/

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function (event, context) {
	var sourceTableName = event.source_table_name;
	var destTableName = event.dest_table_name;
	// functions
	var main = null;
	var getSourceData;
	var writeData;

	main = function () {
		// get source data
		getSourceData(function (sourceData) {
			writeData(sourceData, function () {
				context.succeed();
			});
		});
	};
	
	getSourceData = function (action) {
		var params = {
			"TableName": sourceTableName,
			"Select": "ALL_ATTRIBUTES"
		};
		dynamo.scan(param, function (err, data) {
			action(data);
		});
	};
	
	writeData = function (sourceData, action) {
		console.log(sourceData);
	};
	
	main();
};