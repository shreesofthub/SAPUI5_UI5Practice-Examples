sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"
    ],
    function (oController, oHistory, jsonModel) {
        return oController.extend("upe.upetable1.controller.table4_1", {
            onInit: function () {
                that = this;
                that.oRouter = this.getOwnerComponent().getRouter();
                var oModel_4 = new jsonModel();
                var user = [];
                for (i = 0; i < 20; i++) {
                    user.push({
                        lastName: 'Last Name' + i,
                        firtsname: 'First Name' + i
                    });
                }
                oModel_4.setData(user);
                var oTable = new sap.m.Table("idTable4_1", {
                    mode: sap.m.ListMode.Delete,
                    columns: [
                        new sap.m.Column({
                            width: "1em",
                            header: new sap.m.Label({
                                text: "Last Name"
                            })
                        }),
                        new sap.m.Column({
                            width: "1em",
                            header: new sap.m.Label({
                                text: "First Name"
                            })
                        })
                    ],
                    // items: {
                    //     path: "/",
                    //     template: new sap.m.ColumnListItem({
                    //         cells: [
                    //             new sap.m.Text({
                    //                 text: "{lastName}"
                    //             }),
                    //             new sap.m.Text({
                    //                 text: "{lastName}"
                    //             })
                    //         ]
                    //     })
                    // },
                    delete: function (e) {
                        var path = e.getParameter("listItem").getBindingContextPath();
                        var obj = this.getModel().getProperty(path);
                        var oData = this.getModel().getData().splice(parseInt(path.substring(1)),1);
                        this.removeItem(e.getParameter('listItem'));
                        setTimeout(function () {
                            oTable.getModel().getData().push(obj);
                            that.template(oTable);
                            setTimeout(function () {
                                that.scrollItem(oTable);
                            }, 500);
                        }, 1000)

                    }
                }).setModel(oModel_4);
                that.byId("idHBoxForContent").addItem(oTable);
                that.template(oTable);
            },
            onBack: function () {
                var instance = oHistory.getInstance();
                var prevHash = instance.getPreviousHash();
                if (prevHash !== undefined) {
                    window.history.go(-1);
                }
                else {
                    that.oRouter.navTo("RouteappView");
                }
            },
            template: function (table) {
                var oTemplate = new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({
                            text: "{lastName}"
                        }),
                        new sap.m.Text({
                            text: "{lastName}"
                        })
                    ]
                });
                table.bindItems("/", oTemplate);
            },
            scrollItem: function (tbl) {
                var idx = tbl.getModel().getData().length - 1;
                var domTr = tbl.$().find(("table tr:nth-child(" + idx + ")"));
                domTr.focus();
            }
        });
    });