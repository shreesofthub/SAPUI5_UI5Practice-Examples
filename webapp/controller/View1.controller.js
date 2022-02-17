sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("upe.upetable1.controller.View1", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oModel= this.getOwnerComponent().getModel();
                var oTable = new sap.m.Table("idTbale", {
                    alternateRowColors: true,
                    mode: sap.m.ListMode.SingleSelect,
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "EmployeeId"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "EmployeeName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "fatherName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "DOB"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text:"MartialStatus"
                            })
                        }),
                        new sap.m.Column({
                            header:new sap.m.Label({
                                text:"City"
                            })
                        }),
                        new sap.m.Column({
                            header:new sap.m.Label({
                                text:"Phone Number"
                            })
                        })
                    ],
                    items:{
                        path:"/emp",
                        template:new sap.m.ColumnListItem({
                            cells:[
                                new sap.m.Text({
                                    text:"{id}"
                                }),
                                new sap.m.Text({
                                    text:"{name}"
                                }),
                                new sap.m.Text({
                                    text:"{fatherName}"
                                }),
                                new sap.m.Text({
                                    text:"{dob}"
                                }),
                                new sap.m.Text({
                                    text:"{mStatus}"
                                }),
                                new sap.m.Text({
                                    text:"{city}"
                                }),
                                new sap.m.Text({
                                    text:"{phone}"
                                })
                            ]
                        })
                    }
                });
                var oButton = new sap.m.Button("idButton1",{
                    text:"GetSelectedRecord",
                    press:function(oEvent){                        
                        var oModel = oEvent.getSource().getModel();
                        var sPath = oTable.getSelectedItem().getBindingContextPath();
                        var selectedIndex = sPath.split("/")[2];
                        var getAllRowsFromModel_emp = oModel.getData();
                        var getSelectedRow_id = getAllRowsFromModel_emp.emp[selectedIndex].id;
                        new sap.m.MessageToast.show("User Selected" + getSelectedRow_id);
                    }                    
                })
                this.byId("idPanelforContent").addContent(oTable);
                this.byId("idPanelforContent").addContent(oButton);
            },
            _onBackView1_Rb:function(){
                this.oRouter.navTo("RouteappView");
            }
        });
    });
