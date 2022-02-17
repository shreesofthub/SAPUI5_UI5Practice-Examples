sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.table13_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                that.oTable = new sap.m.Table("idTable13_1_C", {
                    backgroundDesign: "Transparent",
                    columns: [
                        new sap.m.Column({
                            sortIndicator: "Ascending",
                            header: new sap.m.Title({
                                text: "First Name"
                            })
                        }),
                        new sap.m.Column({
                            sortIndicator: "Ascending",
                            header: new sap.m.Title({
                                text: "Last Name"
                            })
                        }),
                    ],
                    headerToolbar: new sap.m.Toolbar({
                        content: [
                            new sap.m.CheckBox("idCB13_1", {
                                text: "Add or delete a record after 2000Sec",
                                selected: true,
                                select: function (evnt) {
                                    get_selection = evnt.getParameter("selected");
                                    that.setTimeOut(get_selection);
                                }
                            })
                        ]
                    })
                });
                var oModel = new sap.ui.model.json.JSONModel();
                var users = [];
                for (i = 0; i < 10; i++) {
                    users.push(
                        {
                            "fName": "First Name" + i,
                            "lName": "Last Name" + i
                        }
                    )
                }
                oModel.setData(users);
                that.oTable.setModel(oModel);
                that.bindModel(that.oTable);
                // that.oTable.placeAt("content");
                that.byId("idTable13_1").addContent(that.oTable);
                that.setTimeOut(true);
            },
            bindModel: function (tbl) {
                tbl.bindItems("/",
                    new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({
                                text: "{fName}"
                            }),
                            new sap.m.Text({
                                text: "{lName}"
                            })
                        ]
                    })
                )
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            },
            setTimeOut: function (sel) {
                if (sel === true) {
                    setTimeout(function () {
                        that.oTable.getModel().getData().push(
                            {
                                "fName": "Robbin",
                                "lName": "Uthappa-This record included based on timeout function-2000Sec"
                            }
                        );
                        that.bindModel(that.oTable);
                    }, 2000)
                } else {
                    that.oTable.getModel().getData().pop();
                    that.bindModel(that.oTable);
                }
            }
        });
    }
)