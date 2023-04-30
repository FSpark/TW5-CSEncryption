(function () {
    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";
//h
// Export name and synchronous status
    exports.name = "cse-password";
    exports.platforms = ["browser"];
    exports.after = ["startup"];
    exports.synchronous = true;

    exports.startup = function () {
        $tw.rootWidget.addEventListener("tm-cse-set-password", function (event) {
            var params, password;
            if(typeof event.paramObject === "object") {
                params = event.paramObject;
            }
            if(typeof event.param === "object") { // Backwards compatibility with 5.1.3
                params = event.param;
            }
            if(params && params.password) {
                password = params.password;
            }
// debugger;
            if(password){
                    $tw.CSE.setPassword(password);
                    $tw.CSE.forcePush();
            } else {
                $tw.passwordPrompt.createPrompt({
                    serviceName: $tw.language.getString("Encryption/PromptSetPassword"),
                    noUserName: true,
                    submitText: $tw.language.getString("Encryption/SetPassword"),
                    canCancel: true,
                    repeatPassword: true,
                    callback: function (data) {
                        if (data) {
                            console.log(data)
                            $tw.CSE.setPassword(data.password);
                            $tw.CSE.forcePush();
                            return true; // Get rid of the password prompt
                        }
                    }
                });
            }
        });
        $tw.rootWidget.addEventListener("tm-cse-clear-password", function (event) {
            if($tw.browser) {
                if (!confirm($tw.language.getString("Encryption/ConfirmClearPassword"))) {
                    return;
                }
            }
            $tw.CSE.setPassword(null);
            $tw.CSE.forcePush();
        });
        $tw.rootWidget.addEventListener("tm-cse-remember-password", function (event) {
            if($tw.browser) {
               $tw.CSE.rememberPassword();
            }
        });
        $tw.rootWidget.addEventListener("tm-cse-forget-password", function (event) {
            if($tw.browser) {
                $tw.CSE.forgetPassword();
            }
        });
        $tw.rootWidget.addEventListener("tm-cse-modal-test", function (event) {
            if($tw.browser) {
                var id = $tw.wiki.getTiddlerText('$:/temp/CSE-IntervalID')
                var n = 0
                if(id) clearTimeout(parseInt(id))
                var self = this;
                $tw.modal.display("$:/plugins/FSpark/TW5-CSE/ui/PushingModal")
                id = setInterval(function() {
                    if(n<5){
                        $tw.wiki.addTiddler({title: "$:/temp/shownumber",text: n.toString()})
                    }else{
                        // debugger;
                        $tw.wiki.addTiddler({title: "$:/state/cse-modal-close", text: "yes"})
                        clearTimeout(id)
                        $tw.wiki.deleteTiddler("$:/temp/CSE-IntervalID")
                    }
                    n++;
                }, 1000);
                $tw.wiki.addTiddler({title: "$:/temp/CSE-IntervalID",text: id.toString()})
            }
        });
        // Ensure that $:/isCSEncrypted is maintained properly
        $tw.wiki.addEventListener("change", function (changes) {
            if($tw.utils.hop(changes, "$:/isCSEncrypted")) {
                $tw.CSE.updateCryptoStateTiddler();
            }
        });
    };
})();