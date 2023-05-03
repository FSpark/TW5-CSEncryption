(function () {
    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";

    // Export name and synchronous status
    exports.name = "cse-password";
    exports.platforms = ["browser"];
    exports.after = ["startup"];
    exports.synchronous = true;

    exports.startup = function () {
        $tw.rootWidget.addEventListener("tm-cse-set-password", function (event) {
            if(!checkCSE()) return;
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
            if(!checkCSE()) return;
            if($tw.browser) {
                if (!confirm($tw.language.getString("Encryption/ConfirmClearPassword"))) {
                    return;
                }
            }
            $tw.CSE.setPassword(null);
            $tw.CSE.forcePush();
        });
        $tw.rootWidget.addEventListener("tm-cse-remember-password", function (event) {
            if(!checkCSE()) return;
            if($tw.browser) {
               $tw.CSE.rememberPassword();
            }
        });
        $tw.rootWidget.addEventListener("tm-cse-forget-password", function (event) {
            if(!checkCSE()) return;
            if($tw.browser) {
                $tw.CSE.forgetPassword();
            }
        });
        function checkCSE(){
            if($tw.CSE) {
                $tw.wiki.addTiddler({title: "$:/state/cse-booted", text: "yes"})
                return true
            } else {
                $tw.wiki.addTiddler({title: "$:/state/cse-booted", text: "no"})
                alert("CSE failed to start successfully, please read the documentation carefully or ask for help.")
                return false
            }
        }
        $tw.rootWidget.addEventListener("tm-cse-check-boot", function (event) {
            if($tw.browser) {
                if($tw.CSE){
                    checkCSE()
                }
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