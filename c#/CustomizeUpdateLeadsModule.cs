using Sage.Platform.Application;
using System.Web.UI;
using System.Web;

namespace Custom.Modules
{
    public class CustomizeUpdateLeadsModule : IModule
    {
        public void Load()
        {
            Page page = HttpContext.Current.Handler as Page;
            if (page != null)
            {
                ScriptManager.RegisterClientScriptInclude(page, page.GetType(), "CustomizeUpdateLeads",
                    HttpContext.Current.Request.ApplicationPath + "/Custom/js/CustomizeUpdateLeads.js");
            }
        }
    }
}
