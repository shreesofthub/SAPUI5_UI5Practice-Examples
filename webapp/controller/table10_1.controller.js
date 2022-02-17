sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.tabl10_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                that.inputFields = [];
                var model = new sap.ui.model.json.JSONModel({
                    d: {
                        results: []
                    }
                });
                for (i = 0; i < 10; i++) {
                    that.inputFields.push(new sap.m.Input({
                        width: "15em"
                    }));
                }
                that.inputFields.forEach(function (f) {
                    that.byId("idTable10_1").addContent(f);
                });
                that.byId("idTable10_1").addContent(new sap.m.Button({
                    text: "Add",
                    press: function () {
                        that.addData();
                    }
                }))
                that.oTable = new sap.ui.table.Table("idTableUi", {
                    alternateRowColors: true
                }).bindRows("/d/results");
                that.oTable.addColumn(
                    new sap.ui.table.Column({
                        label: new sap.m.Label({
                            text: "InputValue"
                        }),
                        template: new sap.m.Text({
                            text: "{value}"
                        })
                    })
                );
                that.oTable.setModel(model);
                that.byId("idTable10_1").addContent(that.oTable);
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            },
            addData: function () {
                var array = that.inputFields.map(function (f) {
                    return { value: f.getValue() };
                });
                that.oTable.getModel().setProperty('/d/results', array);
            }
        });
    }
);