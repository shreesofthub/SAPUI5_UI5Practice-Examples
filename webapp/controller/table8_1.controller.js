sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.table8_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var city = [
                    {
                        "short": "HYD",
                        "desc": ""
                    },
                    {
                        "short": "WGL",
                        "desc": ""
                    },
                    {
                        "short": "KNR",
                        "desc": ""
                    },
                    {
                        "short": "KHM",
                        "desc": ""
                    }
                ];
                var oCityJsonModel = new sap.ui.model.json.JSONModel();
                oCityJsonModel.setData(city);
                that.oTable = new sap.ui.table.Table("idTable8_1_1", {
                    alternateRowColors: true,
                    visibleRowCount: 3,
                }).setModel(oCityJsonModel);
                that.oTable.addColumn(new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "ShortName"
                    }),
                    template: new sap.m.Text({
                        text: "{short}"
                    })
                }));
                // var column2 = 
                that.oTable.addColumn(new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "Full Description"
                    }),
                    // });
                    template: new sap.ui.commons.ValueHelpField({
                        value: "{desc}",
                        valueHelpRequest: function (oEvent) {
                            that.index = oEvent.getSource().getBindingContext().sPath;
                            var oDialog = new sap.ui.commons.Dialog()
                            oDialog.setTitle("Dialog for Input");
                            var oText = new sap.ui.commons.TextField({
                                value: ""
                            });
                            oDialog.addContent(oText);
                            oDialog.addButton(new sap.m.Button({
                                text: "ok",
                                press: function () {
                                    var oValue = oText.getValue();
                                    var data = that.oTable.getModel().oData;
                                    console.log(data);
                                    data[parseInt(that.index.substring(1), 0)].desc = oValue;
                                    that.oTable.getModel().refresh();
                                    oDialog.close();
                                }
                            }));
                            oDialog.open();
                        }
                    })
                }));
                that.oTable.bindRows("/");
                that.byId("idTable8_1").addContent(that.oTable);
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            }
        });
    }
)