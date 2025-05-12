import org.cloudbus.cloudsim.allocationpolicies.VmAllocationPolicySimple;
import org.cloudbus.cloudsim.brokers.DatacenterBrokerSimple;
import org.cloudbus.cloudsim.core.CloudSim;
import org.cloudbus.cloudsim.datacenters.Datacenter;
import org.cloudbus.cloudsim.datacenters.DatacenterSimple;
import org.cloudbus.cloudsim.hosts.Host;
import org.cloudbus.cloudsim.hosts.HostSimple;
import org.cloudbus.cloudsim.resources.Pe;
import org.cloudbus.cloudsim.resources.PeSimple;
import org.cloudbus.cloudsim.schedulers.cloudlet.CloudletSchedulerTimeShared;
import org.cloudbus.cloudsim.schedulers.vm.VmSchedulerTimeShared;
import org.cloudbus.cloudsim.vms.Vm;
import org.cloudbus.cloudsim.cloudlets.Cloudlet;
import org.cloudbus.cloudsim.cloudlets.CloudletSimple;
import org.cloudsimplus.builders.tables.CloudletsTableBuilder;

import java.util.ArrayList;
import java.util.List;

public class CloudSimExample {
    public static void main(String[] args) {
        // Initialize CloudSim
        CloudSim simulation = new CloudSim();

        // Create a Datacenter
        Datacenter datacenter = createDatacenter(simulation);

        // Create a Broker
        DatacenterBrokerSimple broker = new DatacenterBrokerSimple(simulation);

        // Create Virtual Machines
        List<Vm> vmList = createVms();

        // Create Cloudlets
        List<Cloudlet> cloudletList = createCloudlets();

        // Submit VM and Cloudlet lists to the broker
        broker.submitVmList(vmList);
        broker.submitCloudletList(cloudletList);

        // Start Simulation
        simulation.start();

        // Print Cloudlet results
        new CloudletsTableBuilder(broker.getCloudletFinishedList()).build();
    }

    private static Datacenter createDatacenter(CloudSim simulation) {
        // Create a list of Processing Elements (PEs)
        List<Pe> peList = new ArrayList<>();
        int mips = 1000;
        peList.add(new PeSimple(mips)); // 1 PE with 1000 MIPS

        // Create a Host with 2GB RAM, 1TB Storage, and 10000 Mbps Bandwidth
        List<Host> hostList = new ArrayList<>();
        int ram = 2048; // in MB
        long storage = 1_000_000; // in MB
        long bw = 10_000; // in Mbps
        hostList.add(new HostSimple(ram, bw, storage, peList).setVmScheduler(new VmSchedulerTimeShared()));

        // Create a Datacenter with a simple VM allocation policy
        return new DatacenterSimple(simulation, hostList, new VmAllocationPolicySimple());
    }

    private static List<Vm> createVms() {
        List<Vm> vmList = new ArrayList<>();
        int vmCount = 2; // Number of VMs
        int mips = 1000;
        int ram = 1024; // in MB
        long storage = 10_000; // in MB
        long bw = 1000; // in Mbps
        for (int i = 0; i < vmCount; i++) {
            vmList.add(new Vm(i, mips, 1)
                .setRam(ram).setBw(bw).setSize(storage)
                .setCloudletScheduler(new CloudletSchedulerTimeShared()));
        }
        return vmList;
    }

    private static List<Cloudlet> createCloudlets() {
        List<Cloudlet> cloudletList = new ArrayList<>();
        int cloudletCount = 4; // Number of Cloudlets
        long length = 10_000; // in Million Instructions (MI)
        int pes = 1; // Number of PEs required per Cloudlet
        long fileSize = 300; // in MB
        long outputSize = 300; // in MB
        for (int i = 0; i < cloudletCount; i++) {
            cloudletList.add(new CloudletSimple(length, pes)
                .setFileSize(fileSize).setOutputSize(outputSize));
        }
        return cloudletList;
    }
}
