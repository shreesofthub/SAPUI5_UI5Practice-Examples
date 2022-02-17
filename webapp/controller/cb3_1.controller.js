sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.cb3_1", {
            onInit: function () {
                that = this;
                that.oRouter = this.getOwnerComponent().getRouter();
                var jsonData = {
                    "boxData": [
                        { key: "0", text: "Today" },
                        { key: "1", text: "tomorrow" },
                        { key: "2", text: "next week" },
                        { key: "3", text: "next Month" },
                        { key: "4", text: "pick your range" }
                    ],
                    "selected": ["0", "1"]
                };
                var jsonModel = new sap.ui.model.json.JSONModel(jsonData);
                var template = new sap.ui.core.Item({
                    key: "{key}",
                    text: "{text}"
                });
                var mcb = new sap.m.MultiComboBox({
                    maxWidth: "30%",
                    items: {
                        path: "/boxData",
                        template: template
                    },
                    selectionChange: function (oEvent) {
                        var selectedItems = oEvent.getSource().getSelectedKeys();
                        alert(selectedItems);
                    }
                }).setModel(jsonModel);
                mcb.onAfterRendering = function () {
                    if (sap.m.MultiComboBox.prototype.onAfterRendering) {
                        sap.m.MultiComboBox.prototype.onAfterRendering.apply(this);
                    }
                    var model = this.getModel();
                    if (model) {
                        var selectedItems = model.getProperty("/selected");
                        if (selectedItems) {
                            this.setSelectedKeys(selectedItems);
                        } else {
                            this.setSelectedKeys([]);
                        }
                    } else {
                        this.setSelectedKeys([]);
                    }
                }
                that.byId("idCb3_1").addContent(mcb);
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            }
        });
    }
);