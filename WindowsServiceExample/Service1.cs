using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace WindowsServiceExample
{
    public partial class Service1 : ServiceBase
    {
        #region Fields
        private string _threadName = "ServiceRenamer";
        private Thread _thread = null;
        private volatile bool _running = false;
        #endregion

        #region Constructors
        public Service1()
        {
            InitializeComponent();
            _thread = new Thread(new ThreadStart(RunThread));
            _thread.Name = _threadName;
            _thread.IsBackground = true;
        }
        #endregion

        #region Methods
        protected override void OnStart(string[] args)
        {
        }

        protected override void OnStop()
        {
        }

        public void Start()
        {
            OnStart(null);
            if (_thread.ThreadState != System.Threading.ThreadState.Stopped)
            {
                _thread.Start();
            }
            else
            {
                _thread = new Thread(new ThreadStart(RunThread));
                _thread.Name = _threadName;
                _thread.IsBackground = true;
                _thread.Start();
            }
        }


        private void RunThread()
        {
            _running = true;

            while (_running)
            {
                try
                {
                    RunStep();
                }
                catch (ThreadInterruptedException)
                {
                    _running = false;
                }
            }
            OnStop();
        }

        private void RunStep()
        {
            try
            {
                System.IO.File.Move(@"c:\Test\t.txt", @"c:\Test\t.log");
                Thread.Sleep(TimeSpan.FromSeconds(10));
            }
            catch (Exception ex)
            {
                if (!(ex is ThreadInterruptedException))
                {
                    Thread.Sleep(TimeSpan.FromSeconds(10));
                }
                else
                {
                    throw ex;
                }
            }
        }
        #endregion
    }
}
