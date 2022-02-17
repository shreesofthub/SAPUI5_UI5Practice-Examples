sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.table11_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var modelData = {
                    "Less": [
                        {
                            "name": "sanjay Ramaswamy",
                            "age": "43"
                        },
                        {
                            "name": "Aravind manjekar",
                            "age": "52"
                        }

                    ],
                    "More": [
                        {
                            "name": "sanjay Ramaswamy",
                            "age": "43"
                        },
                        {
                            "name": "Aravind manjekar",
                            "age": "52"
                        },
                        {
                            "name": "sanjeev Kootla",
                            "age": "32"
                        },
                        {
                            "name": "manhor Pawer",
                            "age": "67"
                        },
                        {
                            "name": "datta kawade",
                            "age": "46"
                        }
                    ],
                    "linkText": "less"
                };
                var ojsonModel = new sap.ui.model.json.JSONModel();
                ojsonModel.setData(modelData);
                that.oTable = new sap.m.Table("idTableM", {
                    alternateRowColors: true,
                    columns: [new sap.m.Column({
                        header: new sap.m.Label({
                            text: "Name"
                        })
                    }),
                    new sap.m.Column({
                        header: new sap.m.Label({
                            text: "Age"
                        })
                    })],
                    items: {
                        path: "/Less",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{name}"
                                }),
                                new sap.m.Text({
                                    text: "{age}"
                                })
                            ]
                        })
                    }
                }).setModel(ojsonModel);
                that.link = new sap.m.Link({
                    text: {
                        path: "/linkText",
                        formatter: function (s) {
                            return (s === 'more') ? 'Less' : 'More';
                        }
                    },
                    press: function () {
                        var tableModel = that.oTable.getModel();
                        var linkTextValue = tableModel.getProperty("/linkText");
                        if (linkTextValue === 'less') {
                            tableModel.setProperty("/linkText", 'more');
                            tableModel.setProperty("/Less", tableModel.getProperty("/More"));
                        } else {
                            tableModel.setProperty("/linkText", "less");
                            var lessData = [];
                            var moreData = tableModel.getProperty("/More")
                            for (i = 0; i < 2; i++) {
                                lessData.push(moreData[i]);
                            }
                            tableModel.setProperty("/Less", lessData);
                        }
                    }
                });
                that.vBox = new sap.m.VBox({
                    items: [
                        that.oTable, that.link
                    ]
                });
                that.byId("idTable11_1").addContent(that.vBox);
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            }
        })
    }
);