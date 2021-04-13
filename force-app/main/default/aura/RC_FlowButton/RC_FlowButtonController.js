({

    init: function(cmp, event, helper) {

        const buttonLabel = cmp.get("v.buttonLabel");
        const launchFlowOnInit = cmp.get("v.launchFlowOnInit");
        console.log('RC_FlowButtonController > init - buttonLabel: ' + buttonLabel + ', launchFlowOnInit: ' + launchFlowOnInit);

        if (launchFlowOnInit) {
            var showFlowInModal = cmp.get("v.showFlowInModal");

            if (showFlowInModal) {
                helper.openModal(cmp);
            } else {
                // show flow inline
                cmp.set("v.showFlow", true);
                helper.showFlow(cmp, 'flowComponent');
            }
        } else {
            // show button
            cmp.set("v.showButton", true);
        }

    }, // end init

    handleNavigation : function(cmp, event, helper) {

        const buttonLabel = cmp.get("v.buttonLabel");
        const flowToLaunch = cmp.get("v.flowToLaunch");
        const showFlowInModal = cmp.get("v.showFlowInModal");
        const buttonFlowAction = cmp.get("v.buttonFlowAction");

        // button clicked
        cmp.set("v.buttonClicked", true)

        if (flowToLaunch) {

            console.log('RC_FlowButtonController > handleNavigation - button clicked: ' + buttonLabel
                        + ', flowToLaunch: ' + flowToLaunch
                        + ', showFlowInModal: ' + showFlowInModal);

            // hide button
            cmp.set("v.showButton", false);

            if (showFlowInModal) {
                helper.openModal(cmp);
            } else {
                // show flow inline
                cmp.set("v.showFlow", true);
                helper.showFlow(cmp, 'flowComponent');
            }

        } else if (buttonFlowAction) {

            console.log('RC_FlowButtonController > handleNavigation - button clicked: ' + buttonLabel
                        + ', buttonFlowAction: ' + buttonFlowAction);

            // navigate in the flow
            helper.navigateFlow(cmp);

        } else {
        	console.log('RC_FlowButtonController > handleNavigation - button not configured to do anything');
        }

   	}, // end handleNavigation

	handleStatusChange : function (cmp, event, helper) {

        const status = event.getParam("status");
        cmp.set("v.flowStatus", status);
        console.log('RC_FlowButtonController > handleStatusChange - status: ' + cmp.get("v.flowStatus"));

        if(status == "FINISHED") {

            // hide flow inline
            cmp.set("v.showFlow", false);

            const showFlowInModal = cmp.get("v.showFlowInModal");
            console.log('RC_FlowButtonController > handleStatusChange - showFlowInModal: ' + showFlowInModal);
            if (showFlowInModal) {
                helper.closeModal(cmp);
            }

            const doAction = cmp.get("v.doFlowActionWhenSubflowCompletes");
            console.log('RC_FlowButtonController > handleStatusChange - doFlowActionWhenSubflowCompletes: ' + doAction);

            if (doAction) {

                // navigate in the flow
                helper.navigateFlow(cmp);

            } else {

            	// show button
            	cmp.set("v.showButton", true);
            }

            /**
            // Get the output variables of the flow and iterate over them
            var outputVariables = event.getParam("outputVariables");
            var outputVar;
            for(var i = 0; i < outputVariables.length; i++) {
                outputVar = outputVariables[i];
                // Pass the values to the component's attributes
                if(outputVar.name === "accountName") {
                    component.set("v.accountName", outputVar.value);
                } else {
                    component.set("v.numberOfEmployees", outputVar.value);
                }
            }
            **/
        }

    }, // end handleNavigation

    closeModal: function(cmp, event, helper) {

        // close modal
        helper.closeModal(cmp);

        // show button
        cmp.set("v.showButton", true);

    }, // end closeModal

})
