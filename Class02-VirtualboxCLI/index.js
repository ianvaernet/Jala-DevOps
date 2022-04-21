const virtualbox = require('virtualbox');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getVMNames = ({ machines, running = null }) => {
  let vmList = Object.values(machines);
  if (running != null) {
    vmList = vmList.filter((machine) => machine.running == running);
  }
  return vmList.map((machine) => machine.name);
};

const getOptions = (options) => {
  return options.map((option, index) => `${index + 1}. ${option}`).join('\n') + '\n';
};

const isOutOfRange = (index, list) => {
  return parseInt(index) < 0 || parseInt(index) > list.length;
};

const runningVMs = [];
const stoppedVMs = [];
const allVMs = [];

virtualbox.list((machines, error) => {
  if (error) console.error(error);
  runningVMs.push(...getVMNames({ machines, running: true }));
  stoppedVMs.push(...getVMNames({ machines, running: false }));
  allVMs.push(...getVMNames({ machines }));

  console.log('-- VirtualBox CLI ---');
  console.log('These are all your VMs:');
  console.log(allVMs.join('\n'));
  console.log('\nWhat do you want to do?');

  readline.question(getOptions(['Start a VM', 'Stop a VM', 'Restart a VM']), (action) => {
    console.log('\nSelect the VM:');
    if (action == 1) {
      readline.question(getOptions(stoppedVMs), (VMIndex) => {
        if (isOutOfRange(VMIndex, stoppedVMs)) console.error('Wrong option number');
        else {
          virtualbox.start(stoppedVMs[VMIndex - 1], (error) => {
            if (error) console.error(error);
            else console.log(`${stoppedVMs[VMIndex - 1]} started!`);
          });
        }
        readline.close();
      });
    } else if (action == 2) {
      readline.question(getOptions(runningVMs), (VMIndex) => {
        if (isOutOfRange(VMIndex, stoppedVMs)) console.error('Wrong option number');
        else {
          virtualbox.poweroff(runningVMs[VMIndex - 1], (error) => {
            if (error) console.error(error);
            else console.log(`${runningVMs[VMIndex - 1]} stopped!`);
          });
        }
        readline.close();
      });
    } else if (action == 3) {
      readline.question(getOptions(runningVMs), (VMIndex) => {
        if (isOutOfRange(VMIndex, runningVMs)) console.error('Wrong option number');
        else {
          virtualbox.reset(runningVMs[VMIndex - 1], (error) => {
            if (error) console.error(error);
            else console.log(`${runningVMs[VMIndex - 1]} restarted!`);
          });
        }
        readline.close();
      });
    } else {
      console.error('Wrong option number');
      readline.close();
    }
  });
});
