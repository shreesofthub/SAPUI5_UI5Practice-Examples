sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"],
    function (oController, oHistory, oJson) {
        return oController.extend("upe.upetable1.controller.table3_1", {
            onInit: function () {
                that = this;
                that.deletedRecords = [];
                that.oRouter = this.getOwnerComponent().getRouter();
                var oTable = new sap.m.Table("idTable3_1C", {
                    alternateRowColors: true,
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: ""
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "id"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "name"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "fatherName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "dob"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "mStatus"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "city"
                            })
                        })
                    ],
                    headerToolbar: new sap.m.Toolbar({
                        content: new sap.m.Switch({
                            state: true,
                            customTextOff: "Del",
                            customTextOn: "UnD",
                            name: "Records to Navigate",
                            tooltip: "Selection of Deleted or UnDeletedRecords to Navigate",
                            change: function (event) {
                                var switchState = event.getParameters().state;
                                that.onSwitchChange(switchState);
                            }
                        })
                    })  
                });
                var oTemplate = new sap.m.ColumnListItem("idListItem", {
                    cells: [
                        new sap.ui.core.Icon({
                            src: "sap-icon://delete",
                            press: function (oEvent) {
                                var oSource = oEvent.getSource();
                                that.deleteItem(oSource);
                            },
                            // tooltip:"below one butto"
                        }),
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
                        })
                    ]
                });
                oTable.bindItems("/emp", oTemplate);
                that.oButton = new sap.m.Button("idButton", {
                    text: "Get UnDeleted Records into next View",
                    press: function () {
                        var deletedRecordJson = new oJson();
                        deletedRecordJson.setData(that.deletedRecords);
                        that.getView().setModel(deletedRecordJson, "deleted");
                        if (that.oButton.getText() === 'Deleted Records in Same View') {
                            if (that.oTable2 !== undefined) {
                                var deletedModel = that.getView().getModel("deleted");
                                that.oTable2.setModel(deletedModel);
                                that.oTable2.bindRows("/");
                            } else {
                                that.displayTableInPanel2();
                            }
                        } else {
                            that.oRouter.navTo("table3_1");
                        }
                    },
                    tooltip: "This Button text will change based on above switch selection"
                });
                this.byId("idPanel").addContent(oTable);
            },
            onBack: function () {
                this.oRouter.navTo("RouteappView");
            },
            deleteItem: function (src) {
                var getContext = src.getBindingContext();
                var deletedRecord = getContext.getObject();
                that.deletedRecords.push(deletedRecord);
                var deltedItemNumber = getContext.getPath().split("/")[2];
                var oModel = src.getModel();
                var empData = oModel.getProperty("/emp");
                empData.splice(deltedItemNumber, 1);
                oModel.setProperty("/emp", empData);
                this.byId("idPanel").addContent(that.oButton);
            },
            onSwitchChange: function (state) {
                if (state == false) {
                    that.oButton.setText("Deleted Records in Same View");
                } else {
                    that.oButton.setText("Un Deleted Records to NextView");
                }
            },
            displayTableInPanel2: function () {
                that.oTable2 = new sap.ui.table.Table("idTable2", {
                    alternateRowColors: true,
                    title: "{i18n>table2Title}"
                });
                that.oTable2.addColumn(new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "id"
                    }),
                    template: new sap.m.Text({
                        text: "{id}"
                    })
                }));
                that.oTable2.addColumn(new sap.ui.table.Column({
                    label: new sap.m.Label({
                        text: "name"
                    }),
                    template: new sap.m.Text({
                        text: "{name}"
                    })
                }));
                var deletedModel = that.getView().getModel("deleted");
                that.oTable2.setModel(deletedModel);
                that.oTable2.bindRows("/");
                that.byId("idPanel1").addContent(that.oTable2);
            }
        })
    }
);