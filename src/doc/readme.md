<div align="center">

# TW5-CSEncryption

Client-Side Encryption for [TiddlyWiki5](https://tiddlywiki.com) on Node.js
</div>

### Check CSE

Please go $:/plugins/FSpark/TW5-CSE/settings/check first to check if CSE started successfully.

### Getting Started
You can see the {{$:/plugins/FSpark/TW5-CSE/ui/cloudunlock}} button in the sidebar, this is the unencrypted state, at this point the written Tiddlers are all in sync as normal.

In the unencrypted state, you can manually override the filters under $:/config/TW5-CSE/EncryptFilter directly first, and this setting will be applied automatically the next time you encrypt. However, if you are in encrypted state, it is better to perform filter migration via $:/plugins/FSpark/TW5-CSE/settings/filter .

### Start Encryption

Write something random and click the {{$:/plugins/FSpark/TW5-CSE/ui/cloudlock}} button. Enter the password in the dialog and wait for it to sync.

After that, click the {{$:/plugins/FSpark/TW5-CSE/ui/cloudlock}} button again and you will be taken to the plugin's settings page: $:/plugins/FSpark/TW5-CSE/ui/SettingsPanel, where you can change the password or something like that.

### Further More
* Online documentation: <https://fspark.github.io/TW5-CSEncryption/>
* Issue feedback: <https://github.com/FSpark/TW5-CSEncryption/issues>