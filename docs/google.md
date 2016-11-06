
The following steps detail how to obtain a client ID, client secret, and refresh token that can be used for authentication with Google related tools.
 
1. Open https://console.developers.google.com
2. Login with the Google account associated with the data you would like to analyze
3. Create a new project by clicking the **Select a project** dropdown (top-right corner) and selecting **Create a project...**
4. Enter a Project name of your choosing and click **Create**
5. From the project Dashboard click **Enable and manage APIs**
6. Select the proper API from the Google APIs list
    1. For Google Analytics tool
        * Analytics API
    2. For Google Sheets tools
        * Drive API
7. Click on **Enable API**
8. Click on **Credentials**
9. Click on the **New Credentials** dropdown and select **OAuth client ID**
10. Click on **Configure consent screen**
11. Enter a Product name and click **Save**
12. Select the **Web application** radio button, add https://developers.google.com/oauthplayground as an Authorized redirect URI, and click **Create**
13. A window will pop-up with your client ID and client secret; save these for future reference and click **OK**
14. Go to https://developers.google.com/oauthplayground
15. Click on the **gear icon** in the top-right corner of the page, click the checkbox for **Use your own OAuth credentials**, enter the client ID and client secret from step 13, and click **close**
16. Copy/paste the respective scopes into Input your own scopes and click **Authorize APIs**:
    1. For Google Analytics tool
        * https://www.googleapis.com/auth/analytics.readonly
    2. For Google Sheets tools
        * https://spreadsheets.google.com/feeds https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets
17. Click **Allow**
18. Click **Exchange authorization code for tokens** and save the Refresh token
19. Test the authorization by sending a request for an available operation from **List possible operations**
20. If successful, the client ID, client secret, and refresh token that you obtained in the prior steps can now be used for authentication with the Google related tools.
 
 
https://community.alteryx.com/t5/Alteryx-Knowledge-Base/How-to-Create-Google-API-Credentials/ta-p/11834
