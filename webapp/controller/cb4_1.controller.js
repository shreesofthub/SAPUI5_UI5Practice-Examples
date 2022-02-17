sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"
    ],
    function (oController, oHistory, model) {
        return oController.extend("upe.upetable1.controller.cb4_1", {
            onInit: function () {
                that = this;
                this.oRouter = this.getOwnerComponent().getRouter();
                var data = {
                    "boxData": [
                        { "key": "1", text: "nexweek", country: "United States of America" },
                        { "key": "2", text: "nexMonth", country: "United Kingdom" },
                        { "key": "3", text: "nexYear", country: "Back to India" }
                    ]
                };
                var jsonModel = new model(data);
                var comBoBox = new sap.m.ComboBox({
                    maxWidth: "30%",
                    selectionChange: function (oEvent) {
                        var selectedItem = oEvent.getParameter("selectedItem");
                        var selectedItemObject = selectedItem.getBindingContext().getObject();
                        sap.ui.getCore().byId("idTextCb4_1").setText(selectedItemObject.text);
                    }
                });
                var template = new sap.ui.core.Item({
                    key: "{key}",
                    text: "{text}-{country}"
                });
                comBoBox.setModel(jsonModel);
                comBoBox.bindItems("/boxData", template);
                var text = new sap.m.Text({
                    id: "idTextCb4_1"
                });
                this.byId("idCb4_1").addContent(comBoBox).addContent(text);
            },
            onBack: function () {
                var history = oHistory.getInstance();
                var prevHashTag = history.getPreviousHash();
                if (prevHashTag !== undefined) {
                    window.history.go(-1);
                }
            }
        })
    }
);