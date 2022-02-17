sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.table7_2", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.deltedModel = sap.ui.getCore().getModel("deletedModel");
                var oTable2 = new sap.m.Table("idTable7_2_2", {
                    alternateRowColors: true,
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "FirstName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "LastName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Age"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "City"
                            })
                        })
                    ],
                    items: {
                        path: "/",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{firtsName}"
                                }),
                                new sap.m.Text({
                                    text: "{lastName}"
                                }),
                                new sap.m.Text({
                                    text: "{age}"
                                }),
                                new sap.m.Text({
                                    text: "{city}"
                                })
                            ]
                        })
                    }
                }).setModel(this.deltedModel);
                this.byId("idHLayout").addContent(oTable2);
            },
            onBack: function () {
                sap.ui.getCore().byId("idPanel").getHeaderToolbar().getContent()[0].setSelected(false);
                var history = oHistory.getInstance();
                var prevHashTag = history.getPreviousHash();
                if (prevHashTag !== undefined) {
                    window.history.go(-1);
                } else {
                    this.oRouter.navTo("table7_2", true);
                }
            }
        })
    }
);