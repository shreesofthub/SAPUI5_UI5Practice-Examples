sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.cb1_1", {
            onInit: function () {
                that = this;
                that.oRouter = this.getOwnerComponent().getRouter();
                var jsonData = {
                    "data": [
                        {
                            "name": "sridhar",
                            "age": "35",
                            "city": "Hyd"
                        }, {
                            "name": "Vijay",
                            "age": "38",
                            "city": "Nlg"
                        }, {
                            "name": "Prashanth",
                            "age": "36",
                            "city": "Wgl"
                        }
                    ]
                };
                that.oJsonModel = new sap.ui.model.json.JSONModel(jsonData);
                sap.ui.getCore().setModel(that.oJsonModel, "cb1JsonModel");
                var oTable = new sap.m.Table("idTableCb1", {
                    columns: [
                        new sap.m.Column({
                            // I dont want to display the Header
                        }),
                        new sap.m.Column({
                            // I dont want to display the Header
                        })
                    ]
                }).setModel(that.oJsonModel);
                that.thirdColumn = new sap.m.Column({

                });
                oTable.addColumn(that.thirdColumn);
                that.nameText = new sap.m.Text("idname", {
                    text: "{name}"
                });
                var comboBox = new sap.m.ComboBox("idAge", {
                    items: {
                        path: "/data",
                        template: new sap.ui.core.ListItem("items", {
                            text: "{age}"
                        })
                    }
                });
                that.select = new sap.m.Select({
                    items: {
                        path: "/data",
                        template: new sap.ui.core.Item({
                            key: "{age}",
                            text: "{age}"
                        })
                    },
                })
                var cityText = new sap.m.HBox({
                    items: [
                        new sap.m.Button({
                            icon: sap.ui.core.IconPool.getIconURI("sap-icon://less"),
                            type: sap.m.ButtonType.Reject,
                            press: function () {
                                jsonData.data.pop();
                                oTable.bindItems("/data", template);
                            }
                        }),
                        new sap.m.Button({
                            icon: "sap-icon://add",
                            type: sap.m.ButtonType.Accept,
                            press: function () {
                                jsonData.data.push({
                                    "name": "Naveen",
                                    "age": "",
                                    "city": ""
                                });
                                oTable.bindItems("/data", template);
                            }
                        })
                    ]
                });
                var template = new sap.m.ColumnListItem({
                    vAlign: "Middle",
                    cells: [that.nameText, comboBox, cityText]
                });
                oTable.bindAggregation("items", "/data", template, null); //Items Aggregation, Path, template
                this.byId("idPanelCb1").addContent(oTable).setExpanded(true);
                this.byId("idPanelCb1_1").setExpanded(false);
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            },
            onSwitch: function (event) {
                if (event.getParameter("state") === true) {
                    this.byId("idPanelCb1").setExpanded(false);
                    this.byId("idPanelCb1_1").setExpanded(true);
                    var oTable2 = new sap.m.Table("idTableCb1_2", {
                        columns: [
                            new sap.m.Column({
                                // I dont want to display the Header
                            }),
                            new sap.m.Column({
                                // I dont want to display the Header
                            })
                        ]
                    }).setModel(that.oJsonModel);
                    var template2 = new sap.m.ColumnListItem({
                        vAlign: "Middle",
                        cells: [that.nameText, that.select]
                    });
                    oTable2.bindItems("/data", template2);
                    this.byId("idPanelCb1_1").addContent(oTable2);
                } else {
                    this.byId("idPanelCb1").setExpanded(true);
                    this.byId("idPanelCb1_1").setExpanded(false);
                }
            }
        });
    }
)