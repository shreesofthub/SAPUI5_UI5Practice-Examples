sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.table12_1", {
            onInit: function () {
                that = this;
                that.oRouter = this.getOwnerComponent().getRouter();
                // Local Data array                
                var aData = [
                    {
                        "lastName": "nickle",
                        "name": "allen",
                        "check": true,
                        "link": "www.sap.com",
                        "href": "http://www.sap.com",
                        "rating": 4
                    },
                    {
                        "lastName": "SAP",
                        "name": "UI5",
                        "check": false,
                        "link": "sapUi5_Examples",
                        "href": "https://blogs.sap.com/2015/06/13/ui5-programming-examples/",
                        "rating": 2
                    },
                    {
                        "lastName": "SAPUI5",
                        "name": "SDK",
                        "check": true,
                        "link": "SAP_UI5_SDk",
                        "href": "https://sapui5.hana.ondemand.com/#/topic",
                        "rating": 3
                    }
                ];
                //JSON Model- set the Data to JSON Model                
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({
                    modelData: aData
                });
                // Table Creation and bind the rows
                that.oTable = new sap.ui.table.Table("idTable12_1C", {
                    alternateRowColors: true,
                    editable: true
                }).bindRows("/modelData");
                // set the model to tbale.                
                that.oTable.setModel(oModel);
                // create Template and add columns to table with created template.
                //Column 1
                var oControl = new sap.m.Text({
                    text: "{lastName}"
                })
                that.addTableColumn("lastName", "lastName", "Last Name", oControl);
                //Column 2
                oControl = new sap.m.Text().bindProperty("text", "name");
                that.addTableColumn("name", "name", "First Name", oControl);
                // Column 3
                oControl = new sap.m.CheckBox({
                    selected: "{check}"
                });
                that.addTableColumn("check", "check", "CheckBox", oControl);
                // Column 4
                oControl = new sap.m.Link({
                    href: "{href}",
                    text: "{link}"
                })
                that.addTableColumn("link", "link", "Web Site", oControl);
                // Column 5
                oControl = new sap.m.RatingIndicator({
                    editable: true,
                    value: "{rating}"

                });
                that.addTableColumn("rating", "rating", "Rating", oControl);
                this.byId("idTable12_1").addContent(that.oTable);
            },
            onBack: function () {
                var initHistory = oHistory.getInstance();
                var previousPath = initHistory.getPreviousHash();
                if (previousPath !== undefined) {
                    window.history.go(-1);
                } else {
                    that.oRouter.navTo("RouteappView");
                }
            },
            addTableColumn: function (filter, sort, label, template) {
                that.oTable.addColumn(new sap.ui.table.Column({
                    autoResizable: true,
                    filterProperty: filter,
                    sortProperty: sort,
                    width: "100px",
                    label: new sap.m.Label({
                        text: label
                    }),
                    template: template
                }));
            }
        });
    }
);