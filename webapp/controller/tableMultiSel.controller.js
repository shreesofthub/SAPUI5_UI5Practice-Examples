sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"],
    function (oController, jsonModel) {
        return oController.extend("upe.upetable1.controller.tableMultiSel", {
            onInit: function () {
                that = this;
                that.oRouter = this.getOwnerComponent().getRouter();
                that.oModel = this.getOwnerComponent().getModel();
                var oJsonData = {
                    "dropDown": [
                        {
                            "text": "Message"
                        },
                        {
                            "text": "Send to Other View"
                        }
                    ]
                };
                var oModel = new jsonModel(oJsonData);
                this.getView().setModel(oModel, "DD");
                var oTable = new sap.m.Table("idTable", {
                    alternateRowColors: true,
                    mode: sap.m.ListMode.MultiSelect,
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "EmployeeId"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "EmployeeName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "fatherName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "DOB"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "MartialStatus"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "City"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Phone Number"
                            })
                        }),
                    ],
                    items: {
                        path: "/emp",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{id}"
                                }),
                                new sap.m.Text({
                                    text: "{name}"
                                }),
                                new sap.m.Text({
                                    text: "{fatherName}"
                                }),
                                new sap.m.Text({
                                    text: "{dob}"
                                }),
                                new sap.m.Text({
                                    text: "{mStatus}"
                                }),
                                new sap.m.Text({
                                    text: "{city}"
                                }),
                                new sap.m.Text({
                                    text: "{phone}"
                                })
                            ]
                        })
                    }
                });
                var oButton = new sap.m.Button("idButton2", {
                    text : "Get Message",
                    tooltip: "Based on selction of this Dropdown the below button text will change",
                    press: function () {
                        if (that.getView().byId("idSelect")._getSelectedItemText() === 'Message') {
                            var contexts = oTable.getSelectedContexts();
                            var items = contexts.map(function (c) {
                                return c.getObject();
                            });
                            sap.m.MessageToast.show(JSON.stringify(items));
                        } else if (that.getView().byId("idSelect").getSelectedIndex() === 1) {
                            var oSelectedItems = oTable.getSelectedItems();
                            var oModel_selctedItemProperty = that.oModel.getProperty("/selectedData");
                            for (i = 0; i < oSelectedItems.length; i++) {
                                var getObject = oSelectedItems[i].getBindingContext().getObject();
                                oModel_selctedItemProperty.push(getObject);
                            }
                            that.oModel.setProperty("/selectedData", oModel_selctedItemProperty);
                            that.oRouter.navTo("list");
                        }
                    }
                });
                this.byId("idPanelMulSel").addContent(oTable);
                this.getView().byId("idPanelMulSel").addContent(oButton);
            },
            onBackToAppView: function () {
                this.oRouter.navTo("RouteappView");
            },
            onChange: function () {
                if (this.byId("idSelect").getSelectedIndex() === 0) {
                    sap.ui.getCore().byId("idButton2").setText("Get Message");
                } else if (this.byId("idSelect")._getSelectedItemText() === 'Send to Other View') {
                    sap.ui.getCore().byId("idButton2").setText("Goto Next View");
                }
            }
        })
    }
)