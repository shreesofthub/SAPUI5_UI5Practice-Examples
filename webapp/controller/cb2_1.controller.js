sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.cb2_1", {
            onInit: function () {
                that = this;
                var jsonData = {
                    "boxData": [
                        { key: "0", text: "Today" },
                        { key: "1", text: "tomorrow" },
                        { key: "2", text: "next week" },
                        { key: "3", text: "next Month" },
                        { key: "4", text: "pick your range" }
                    ],
                    "enable": false,
                    "editable":false
                };
                var jsonModel = new sap.ui.model.json.JSONModel();
                jsonModel.setData(jsonData);
                sap.ui.getCore().setModel(jsonModel, "mcbData");
                that.msCB = new sap.m.MultiComboBox("idmCB", {
                    items: {
                        path: "/boxData",
                        template: new sap.ui.core.Item({
                            key: "{key}",
                            text: "{text}"
                        })
                    }
                }).setModel(jsonModel).setSelectedKeys([1]);
                var VBox = new sap.m.VBox({
                    items: [
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Enable:",
                                    class: "sapUiSmallMargin"
                                }),
                                new sap.m.Switch({
                                    customTextOff: "Enb",
                                    customTextOn: "Dis",
                                    change: function (oEvent) {
                                        that.switchChangeEnab(oEvent);
                                    }
                                })
                            ]
                        }),
                        new sap.m.HBox({
                            items: [
                                new sap.m.Label({
                                    text: "Editable:",
                                    class: "sapUiTinyMarginEnd"
                                }),
                                new sap.m.Switch({
                                    customTextOff: "Edi",
                                    customTextOn: "NEd",
                                    change: function (oEvent) {
                                        that.switchChangeEdit(oEvent);
                                    }
                                })
                            ]
                        })
                    ]
                });

                that.byId("idSplitterCb2_1").addContentArea(that.msCB);
                that.byId("idSplitterCb2_1").addContentArea(VBox);
            },
            onBack: function () {
                var historyInstance = oHistory.getInstance();
                var prePath = historyInstance.getPreviousHash();
                if (prePath !== undefined) {
                    window.history.go(-1);
                }
            },
            switchChangeEnab: function (evnt) {
                var oModel = sap.ui.getCore().getModel("mcbData");
                that.msCB.setEnabled(oModel.getProperty("/enable"));
                if (oModel.getProperty("/enable") === false) {
                    oModel.setProperty("/enable", true);
                } else {
                    oModel.setProperty("/enable", false);
                }
            },
            switchChangeEdit: function (evnt) {
                var oModel = sap.ui.getCore().getModel("mcbData");
                that.msCB.setEditable(oModel.getProperty("/editable"));
                if (oModel.getProperty("/editable") === false) {
                    oModel.setProperty("/editable", true);
                } else {
                    oModel.setProperty("/editable", false);
                }
            }
        });
    }
)