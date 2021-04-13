({
	showFlow: function(cmp, flowComponentID) {

        // find the view component (by aura:id) where the flow will be displayed
        const flow = cmp.find(flowComponentID);

        if (flow) {

            const flowToLaunch = cmp.get("v.flowToLaunch");
            const recordId = cmp.get("v.recordId");

            // flow inputs
            const inputVariables = JSON.parse(cmp.get("v.inputParameters"));
            console.log('RC_FlowButtonHelper::::: ', inputVariables);
            if (recordId) inputVariables.push({ name : "recordId", type : "String", value: recordId });
            console.log('RC_FlowButtonHelper > showFlow - flowToLaunch: ' + flowToLaunch + ', inputVariables: ' + JSON.stringify(inputVariables));

            // start the flow by the flow Unique Name
            flow.startFlow(flowToLaunch, inputVariables);
        }

    }, // end showFlow

    openModal: function(cmp) {

        // open modal
        cmp.set("v.modalIsOpen", true);

        // show flow in modal
        this.showFlow(cmp, 'modalFlowComponent');

    }, // end openModal

    closeModal: function(cmp) {
        console.log('RC_FlowButtonHelper > closeModal');

        cmp.set("v.modalIsOpen", false);

    }, // end closeModal

    navigateFlow: function(cmp) {
        const buttonFlowAction = cmp.get("v.buttonFlowAction");

        // navigate in the flow
        // for example, this does the same thing as the "Next" or "Previous" buttons in the standard flow footer
        const navigate = cmp.get("v.navigateFlow");
        if (navigate) {
            navigate(buttonFlowAction);
        }
    }

})
