sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.table14_1", {
            onInit: function () {
                that = this;
                this.oRouter = this.getOwnerComponent().getRouter();
                var oArea = {
                    "Warangal": ["Hanamkonda", "kazipet", "Bollikunta"],
                    "karimnagar": ["Godavarikhani", "Peddapalli", "Ramagundam"],
                    "Mancherial": ["Bellampalli", "Ramakrishnapur", "CC Colony"]
                }
                var oSales = [];
                oSales = oSales.concat.apply(oSales, Object.keys(oArea).map(function (region) {
                    return oArea[region].map(function (town) {
                        return { "region": region, "town": town, price: (Math.random() * 1000000 + 1).toFixed(2) }
                    });
                }));
                that.oModel = new sap.ui.model.json.JSONModel();
                that.oModel.setData({ "sales": oSales });
                var oTable = new sap.m.Table("idTable14_1C", {
                    inset: true,
                    headerText: "Sales by Area",
                    headerToolbar: new sap.m.Toolbar({
                        content: [
                            new sap.m.Button({
                                text: "Sort",
                                press: function () {
                                    var data = this.getParent().getParent().getModel().getData()
                                    that.sortFunction(data);
                                }
                            }),
                            new sap.m.Button({
                                text: "MixUp",
                                press: function () {
                                    var data = this.getParent().getParent().getModel().getData()
                                    that.mixUpFunction(data);
                                }
                            })
                        ]
                    }),
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Distrcit"
                            }),
                            mergeDuplicates: true
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Town/City"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Sales(INR)"
                            }),
                            hAlign: "Right"
                        })
                    ]
                }).setModel(that.oModel);
                oTable.bindAggregation("items", {
                    path: "/sales",
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({
                                text: "{region}"
                            }),
                            new sap.m.Text({
                                text: "{town}"
                            }),
                            new sap.m.Text({
                                text: "{price}"
                            })
                        ]
                    })
                });
                this.byId("idTable14_1").addContent(oTable);
            },
            onBack: function () {
                var history = oHistory.getInstance();
                var prevHashTag = history.getPreviousHash();
                if (prevHashTag !== undefined) {
                    window.history.go(-1);
                } else {
                    this.oRouter.navTo("RouteappView", true);
                }
            },
            sortFunction: function (oData) {
                oData.sales.sort(function (a, b) {
                    if (a.region === b.region) return 0;
                    return a.region > b.region ? 1 : -1;
                });
                that.oModel.setData(oData);
            },
            mixUpFunction: function (oData) {
                oData.sales.sort(function () { return Math.random() - 0.5; });
                that.oModel.setData(oData);
            }
        })
    }
);