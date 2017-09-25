using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsServiceExample
{
    static class MainProgram
    {
#if DEBUG
        private static NotifyIcon _notifyIcon = new NotifyIcon();
        private static ContextMenuStrip _menu = new ContextMenuStrip();

        /// <summary>
        /// The main entry point for the debug version
        /// </summary>
        [MTAThread]
        static void Main(string[] args)
        {
            var service = new Service1();

            service.Start();
            
            Application.Run();

            service.Stop();
        }
#else
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        static void Main()
        {
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
            { 
                new Service1() 
            };
            ServiceBase.Run(ServicesToRun);
        }
#endif
    }
}
