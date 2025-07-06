import React, { useState, useEffect } from 'react';

// Icons from lucide-react (assuming it's available in the environment)
const WifiIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wifi"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/></svg>
);
const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-network"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M6 16v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"/><line x1="12" x2="12" y1="8" y2="10"/></svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07L9.4 6.53"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07L14.6 17.47"/></svg>
);
const RouterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-router"><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M10 14v-2a2 2 0 0 1 4 0v2"/><path d="M12 14V6a2 2 0 0 1 4 0v8"/><path d="M16 14V2a2 2 0 0 1 4 0v12"/><path d="M6 14v-6a2 2 0 0 1 4 0v6"/></svg>
);
const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 12V7a9 3 0 0 0 18 0v5"/><path d="M3 12a9 3 0 0 0 18 0"/><path d="M3 19V14a9 3 0 0 0 18 0v5"/><path d="M3 19a9 3 0 0 0 18 0"/></svg>
);
const KeyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
);


function App() {
  // Simulated available interfaces
  const availableEtherInterfaces = ['ether1', 'ether2', 'ether3', 'ether4', 'ether5'];

  // State for Router Credentials
  const [routerIp, setRouterIp] = useState('192.168.88.1');
  const [routerUsername, setRouterUsername] = useState('admin');
  const [routerPassword, setRouterPassword] = useState('your_router_password');

  // State for LAN configuration
  const [lanIp, setLanIp] = useState('192.168.88.1');
  const [lanNetmask, setLanNetmask] = useState('24');
  const [lanInterface, setLanInterface] = useState('ether2'); // Can be an ether or a bridge

  // State for Bridge configuration
  const [bridgeName, setBridgeName] = useState('bridge-lan');
  const [selectedBridgeInterfaces, setSelectedBridgeInterfaces] = useState(['ether3', 'ether4']);

  // State for WAN configuration
  const [primaryWan, setPrimaryWan] = useState({ interface: 'ether1', ip: '192.168.1.2/24', gateway: '192.168.1.1', addDefaultRoute: true });
  const [isMultiWan, setIsMultiWan] = useState(false);
  const [secondaryWans, setSecondaryWans] = useState([
    { id: 1, interface: 'ether5', ip: '192.168.10.2/24', gateway: '192.168.10.1', addDefaultRoute: true }
  ]);

  // State for Hotspot configuration
  const [hotspotName, setHotspotName] = useState('MyHotspot');
  const [hotspotInterface, setHotspotInterface] = useState('bridge-lan'); // Often a bridge
  const [hotspotAddressPool, setHotspotAddressPool] = useState('hotspot-pool');
  const [hotspotDnsServers, setHotspotDnsServers] = useState('8.8.8.8,8.8.4.4');
  const [hotspotUsers, setHotspotUsers] = useState([{ username: 'user1', password: 'password1' }]);

  // State for Additional IP Pools
  const [additionalIpPools, setAdditionalIpPools] = useState([
    { id: 1, name: 'dhcp-range', ranges: '192.168.88.100-192.168.88.200' }
  ]);

  // State for generated configuration
  const [generatedConfig, setGeneratedConfig] = useState('');
  const [showNotification, setShowNotification] = useState(false);


  // Function to generate MikroTik configuration
  const generateMikrotikConfig = () => {
    let config = `# MikroTik Configuration Script\n\n`;

    // Add Router Credentials as comments
    config += `# Router Access Credentials (for your reference):\n`;
    config += `# IP Address: ${routerIp}\n`;
    config += `# Username: ${routerUsername}\n`;
    config += `# Password: ${routerPassword}\n\n`;


    // Bridge Configuration
    if (selectedBridgeInterfaces.length > 0) {
      config += `# Bridge Configuration\n`;
      config += `/interface bridge add name=${bridgeName}\n`;
      selectedBridgeInterfaces.forEach(intf => {
        config += `/interface bridge port add bridge=${bridgeName} interface=${intf}\n`;
      });
      config += `\n`;
    }

    // LAN Configuration
    config += `# LAN Interface IP Configuration\n`;
    // If LAN interface is a bridge, assign IP to the bridge
    const actualLanInterface = selectedBridgeInterfaces.length > 0 && lanInterface === bridgeName ? bridgeName : lanInterface;
    config += `/ip address add address=${lanIp}/${lanNetmask} interface=${actualLanInterface} network=${lanIp.substring(0, lanIp.lastIndexOf('.'))}.0\n`;
    config += `/ip dns set servers=${hotspotDnsServers} allow-remote-requests=yes\n\n`;

    // WAN Configuration
    config += `# WAN Interface IP Configuration\n`;
    // Primary WAN IP and NAT
    if (primaryWan.interface && primaryWan.ip) {
      config += `/ip address add address=${primaryWan.ip} interface=${primaryWan.interface}\n`;
    }
    config += `/ip firewall nat add chain=srcnat action=masquerade out-interface=${primaryWan.interface}\n`;

    // Primary WAN Route
    if (primaryWan.addDefaultRoute && primaryWan.gateway) {
      config += `/ip route add dst-address=0.0.0.0/0 gateway=${primaryWan.gateway} check-gateway=ping distance=1 comment="Primary WAN Route"\n\n`;
    } else if (primaryWan.addDefaultRoute && !primaryWan.gateway) {
        // If addDefaultRoute is true but no gateway is provided, assume DHCP client will get it
        config += `/ip route add dst-address=0.0.0.0/0 gateway=0.0.0.0 check-gateway=ping distance=1 comment="Primary WAN Route (DHCP)"\n\n`;
    } else {
        config += `\n`; // Add a newline for spacing even if no route is added
    }


    // Multi-WAN Configuration
    if (isMultiWan) {
      config += `# Multi-WAN Configuration\n`;
      secondaryWans.forEach((wan, index) => {
        if (wan.interface && wan.ip) {
          config += `/ip address add address=${wan.ip} interface=${wan.interface}\n`;
          config += `/ip firewall nat add chain=srcnat action=masquerade out-interface=${wan.interface}\n`;
          if (wan.addDefaultRoute && wan.gateway) {
            config += `/ip route add dst-address=0.0.0.0/0 gateway=${wan.gateway} check-gateway=ping distance=${2 + index} comment="Secondary WAN ${index + 1} Route"\n`;
          } else if (wan.addDefaultRoute && !wan.gateway) {
            config += `/ip route add dst-address=0.0.0.0/0 gateway=0.0.0.0 check-gateway=ping distance=${2 + index} comment="Secondary WAN ${index + 1} Route (DHCP)"\n`;
          }
        }
      });
      config += `\n`;
    }

    // Hotspot Configuration
    config += `# Hotspot Configuration\n`;
    config += `/ip pool add name=${hotspotAddressPool} ranges=${lanIp.substring(0, lanIp.lastIndexOf('.'))}.2-${lanIp.substring(0, lanIp.lastIndexOf('.'))}.254\n`;
    config += `/ip hotspot setup interface=${hotspotInterface} address-pool=${hotspotAddressPool} name=${hotspotName}\n`;
    config += `/ip hotspot profile set [find name=default] dns-name=${hotspotName}.net\n`; // Set a default DNS name for the hotspot profile
    config += `/ip hotspot set default-profile=default\n`; // Ensure default profile is used

    // Hotspot Users
    config += `# Hotspot Users\n`;
    hotspotUsers.forEach((user) => {
      if (user.username && user.password) {
        config += `/ip hotspot user add name=${user.username} password=${user.password} profile=default\n`;
      }
    });
    config += `\n`;

    // Additional IP Pools Configuration
    if (additionalIpPools.length > 0) {
      config += `# Additional IP Pools\n`;
      additionalIpPools.forEach((pool) => {
        if (pool.name && pool.ranges) {
          config += `/ip pool add name=${pool.name} ranges=${pool.ranges}\n`;
        }
      });
      config += `\n`;
    }

    setGeneratedConfig(config);
  };

  // Effect to regenerate config whenever inputs change
  useEffect(() => {
    generateMikrotikConfig();
  }, [
    routerIp, routerUsername, routerPassword, // New dependencies
    lanIp, lanNetmask, lanInterface,
    bridgeName, selectedBridgeInterfaces,
    primaryWan, isMultiWan, secondaryWans,
    hotspotName, hotspotInterface, hotspotAddressPool, hotspotDnsServers, hotspotUsers,
    additionalIpPools
  ]);

  // --- CRUD operations for Hotspot Users ---
  const addHotspotUser = () => {
    setHotspotUsers([...hotspotUsers, { username: '', password: '' }]);
  };

  const handleHotspotUserChange = (index, field, value) => {
    const updatedUsers = [...hotspotUsers];
    updatedUsers[index][field] = value;
    setHotspotUsers(updatedUsers);
  };

  const removeHotspotUser = (index) => {
    const updatedUsers = hotspotUsers.filter((_, i) => i !== index);
    setHotspotUsers(updatedUsers);
  };

  // --- CRUD operations for Secondary WANs ---
  const addSecondaryWan = () => {
    setSecondaryWans([...secondaryWans, { id: Date.now(), interface: '', ip: '', gateway: '', addDefaultRoute: true }]);
  };

  const handlePrimaryWanChange = (field, value) => {
    setPrimaryWan(prev => ({ ...prev, [field]: value }));
  };

  const handleSecondaryWanChange = (id, field, value) => {
    setSecondaryWans(secondaryWans.map(wan =>
      wan.id === id ? { ...wan, [field]: value } : wan
    ));
  };

  const removeSecondaryWan = (id) => {
    setSecondaryWans(secondaryWans.filter(wan => wan.id !== id));
  };

  // --- CRUD operations for Additional IP Pools ---
  const addAdditionalIpPool = () => {
    setAdditionalIpPools([...additionalIpPools, { id: Date.now(), name: '', ranges: '' }]);
  };

  const handleAdditionalIpPoolChange = (id, field, value) => {
    setAdditionalIpPools(additionalIpPools.map(pool =>
      pool.id === id ? { ...pool, [field]: value } : pool
    ));
  };

  const removeAdditionalIpPool = (id) => {
    const updatedPools = additionalIpPools.filter(pool => pool.id !== id);
    setAdditionalIpPools(updatedPools);
  };

  // Copy to clipboard functionality
  const copyToClipboard = () => {
    const textarea = document.createElement('textarea');
    textarea.value = generatedConfig;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for browsers where execCommand might not work
      const messageBox = document.createElement('div');
      messageBox.className = 'fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50';
      messageBox.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-xl text-center">
          <p class="text-lg font-semibold mb-4">Failed to copy to clipboard.</p>
          <p class="text-sm text-gray-600 mb-4">Please manually copy the text from the configuration box.</p>
          <button id="closeMessageBox" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">OK</button>
        </div>
      `;
      document.body.appendChild(messageBox);
      document.getElementById('closeMessageBox').onclick = () => document.body.removeChild(messageBox);
    }
    document.body.removeChild(textarea);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans text-gray-800 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8 border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex items-center justify-center gap-3">
          <RouterIcon className="w-10 h-10 text-blue-600" />
          MikroTik Configurator
        </h1>

        {/* Router Credentials Configuration */}
        <section className="bg-gray-100 p-6 rounded-lg shadow-inner border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <KeyIcon className="w-6 h-6" /> Router Credentials (For Reference)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="routerIp" className="block text-sm font-medium text-gray-700 mb-1">Router IP Address</label>
              <input
                type="text"
                id="routerIp"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                value={routerIp}
                onChange={(e) => setRouterIp(e.target.value)}
                placeholder="e.g., 192.168.88.1"
              />
            </div>
            <div>
              <label htmlFor="routerUsername" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                id="routerUsername"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                value={routerUsername}
                onChange={(e) => setRouterUsername(e.target.value)}
                placeholder="e.g., admin"
              />
            </div>
            <div>
              <label htmlFor="routerPassword" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="routerPassword"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200"
                value={routerPassword}
                onChange={(e) => setRouterPassword(e.target.value)}
                placeholder="********"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            <em>These credentials are for your reference in the generated script only. This application does not connect to your router.</em>
          </p>
        </section>

        {/* Bridge Configuration */}
        <section className="bg-orange-50 p-6 rounded-lg shadow-inner border border-orange-100">
          <h2 className="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <LinkIcon className="w-6 h-6" /> Bridge Configuration
          </h2>
          <div className="mb-4">
            <label htmlFor="bridgeName" className="block text-sm font-medium text-gray-700 mb-1">Bridge Name</label>
            <input
              type="text"
              id="bridgeName"
              className="w-full p-3 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:border-transparent transition duration-200"
              value={bridgeName}
              onChange={(e) => setBridgeName(e.target.value)}
              placeholder="e.g., bridge-lan"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Interfaces to Bridge</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availableEtherInterfaces.map(intf => (
                <div key={intf} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`bridge-intf-${intf}`}
                    className="h-5 w-5 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
                    checked={selectedBridgeInterfaces.includes(intf)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBridgeInterfaces([...selectedBridgeInterfaces, intf]);
                      } else {
                        setSelectedBridgeInterfaces(selectedBridgeInterfaces.filter(i => i !== intf));
                      }
                    }}
                  />
                  <label htmlFor={`bridge-intf-${intf}`} className="ml-2 text-sm font-medium text-gray-900">{intf}</label>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LAN Configuration */}
        <section className="bg-blue-50 p-6 rounded-lg shadow-inner border border-blue-100">
          <h2 className="2xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <NetworkIcon className="w-6 h-6" /> LAN Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="lanIp" className="block text-sm font-medium text-gray-700 mb-1">LAN IP Address</label>
              <input
                type="text"
                id="lanIp"
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                value={lanIp}
                onChange={(e) => setLanIp(e.target.value)}
                placeholder="e.g., 192.168.88.1"
              />
            </div>
            <div>
              <label htmlFor="lanNetmask" className="block text-sm font-medium text-gray-700 mb-1">Netmask (CIDR)</label>
              <input
                type="text"
                id="lanNetmask"
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                value={lanNetmask}
                onChange={(e) => setLanNetmask(e.target.value)}
                placeholder="e.g., 24"
              />
            </div>
            <div>
              <label htmlFor="lanInterface" className="block text-sm font-medium text-gray-700 mb-1">LAN Interface (Ether or Bridge)</label>
              <select
                id="lanInterface"
                className="w-full p-3 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 bg-white"
                value={lanInterface}
                onChange={(e) => setLanInterface(e.target.value)}
              >
                {availableEtherInterfaces.map(intf => (
                  <option key={intf} value={intf}>{intf}</option>
                ))}
                {selectedBridgeInterfaces.length > 0 && <option value={bridgeName}>{bridgeName} (Bridge)</option>}
              </select>
            </div>
          </div>
        </section>

        {/* WAN Configuration */}
        <section className="bg-green-50 p-6 rounded-lg shadow-inner border border-green-100">
          <h2 className="text-2xl font-bold text-green-600 mb-4 flex items-center gap-2">
            <ShieldIcon className="w-6 h-6" /> WAN & Firewall (NAT) Configuration
          </h2>
          <div className="mb-4 space-y-4">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Primary WAN Interface</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="primaryWanInterface" className="block text-sm font-medium text-gray-700 mb-1">Interface</label>
                <select
                  id="primaryWanInterface"
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 bg-white"
                  value={primaryWan.interface}
                  onChange={(e) => handlePrimaryWanChange('interface', e.target.value)}
                >
                  {availableEtherInterfaces.map(intf => (
                    <option key={intf} value={intf}>{intf}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="primaryWanIp" className="block text-sm font-medium text-gray-700 mb-1">IP Address/Netmask</label>
                <input
                  type="text"
                  id="primaryWanIp"
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                  value={primaryWan.ip}
                  onChange={(e) => handlePrimaryWanChange('ip', e.target.value)}
                  placeholder="e.g., 192.168.1.2/24"
                />
              </div>
              <div>
                <label htmlFor="primaryWanGateway" className="block text-sm font-medium text-gray-700 mb-1">Gateway</label>
                <input
                  type="text"
                  id="primaryWanGateway"
                  className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                  value={primaryWan.gateway}
                  onChange={(e) => handlePrimaryWanChange('gateway', e.target.value)}
                  placeholder="e.g., 192.168.1.1"
                />
              </div>
              <div className="flex items-center col-span-full md:col-span-1 pt-2 md:pt-0">
                <input
                  type="checkbox"
                  id="primaryWanAddRoute"
                  className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                  checked={primaryWan.addDefaultRoute}
                  onChange={(e) => handlePrimaryWanChange('addDefaultRoute', e.target.checked)}
                />
                <label htmlFor="primaryWanAddRoute" className="ml-2 text-sm font-medium text-gray-900">Add Default Route</label>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="isMultiWan"
              className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
              checked={isMultiWan}
              onChange={(e) => setIsMultiWan(e.target.checked)}
            />
            <label htmlFor="isMultiWan" className="ml-2 text-lg font-medium text-gray-900">Enable Multi-WAN</label>
          </div>

          {isMultiWan && (
            <div className="space-y-4 border-t border-green-200 pt-4 mt-4">
              <h3 className="text-xl font-semibold text-green-700 mb-3">Secondary WAN Interfaces</h3>
              {secondaryWans.map((wan) => (
                <div key={wan.id} className="flex flex-col md:flex-row gap-4 items-end">
                  <div className="flex-1 w-full">
                    <label htmlFor={`wan-interface-${wan.id}`} className="block text-sm font-medium text-gray-700 mb-1">Interface</label>
                    <select
                      id={`wan-interface-${wan.id}`}
                      className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200 bg-white"
                      value={wan.interface}
                      onChange={(e) => handleSecondaryWanChange(wan.id, 'interface', e.target.value)}
                    >
                      <option value="">Select Interface</option>
                      {availableEtherInterfaces.filter(intf => intf !== primaryWan.interface && !secondaryWans.some(sw => sw.interface === intf && sw.id !== wan.id)).map(intf => (
                        <option key={intf} value={intf}>{intf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 w-full">
                    <label htmlFor={`wan-ip-${wan.id}`} className="block text-sm font-medium text-gray-700 mb-1">IP Address/Netmask</label>
                    <input
                      type="text"
                      id={`wan-ip-${wan.id}`}
                      className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                      value={wan.ip}
                      onChange={(e) => handleSecondaryWanChange(wan.id, 'ip', e.target.value)}
                      placeholder="e.g., 10.0.0.2/24"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label htmlFor={`wan-gateway-${wan.id}`} className="block text-sm font-medium text-gray-700 mb-1">Gateway</label>
                    <input
                      type="text"
                      id={`wan-gateway-${wan.id}`}
                      className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-400 focus:border-transparent transition duration-200"
                      value={wan.gateway}
                      onChange={(e) => handleSecondaryWanChange(wan.id, 'gateway', e.target.value)}
                      placeholder="e.g., 10.0.0.1"
                    />
                  </div>
                  <div className="flex items-center flex-shrink-0 w-full md:w-auto mb-3 md:mb-0">
                    <input
                      type="checkbox"
                      id={`wan-add-route-${wan.id}`}
                      className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                      checked={wan.addDefaultRoute}
                      onChange={(e) => handleSecondaryWanChange(wan.id, 'addDefaultRoute', e.target.checked)}
                    />
                    <label htmlFor={`wan-add-route-${wan.id}`} className="ml-2 text-sm font-medium text-gray-900">Add Route</label>
                  </div>
                  {secondaryWans.length > 1 && (
                    <button
                      onClick={() => removeSecondaryWan(wan.id)}
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition duration-200 flex-shrink-0 w-full md:w-auto"
                      title="Remove WAN"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addSecondaryWan}
                className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-lg transition duration-200 transform hover:scale-105"
              >
                Add Secondary WAN
              </button>
            </div>
          )}
        </section>

        {/* Hotspot Configuration */}
        <section className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
            <WifiIcon className="w-6 h-6" /> Hotspot Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="hotspotName" className="block text-sm font-medium text-gray-700 mb-1">Hotspot Name</label>
              <input
                type="text"
                id="hotspotName"
                className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                value={hotspotName}
                onChange={(e) => setHotspotName(e.target.value)}
                placeholder="e.g., MyHotspot"
              />
            </div>
            <div>
              <label htmlFor="hotspotInterface" className="block text-sm font-medium text-gray-700 mb-1">Hotspot Interface (Ether or Bridge)</label>
              <select
                id="hotspotInterface"
                className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200 bg-white"
                value={hotspotInterface}
                onChange={(e) => setHotspotInterface(e.target.value)}
              >
                {availableEtherInterfaces.map(intf => (
                  <option key={intf} value={intf}>{intf}</option>
                ))}
                {selectedBridgeInterfaces.length > 0 && <option value={bridgeName}>{bridgeName} (Bridge)</option>}
              </select>
            </div>
            <div>
              <label htmlFor="hotspotAddressPool" className="block text-sm font-medium text-gray-700 mb-1">Address Pool Name</label>
              <input
                type="text"
                id="hotspotAddressPool"
                className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                value={hotspotAddressPool}
                onChange={(e) => setHotspotAddressPool(e.target.value)}
                placeholder="e.g., hotspot-pool"
              />
            </div>
            <div>
              <label htmlFor="hotspotDnsServers" className="block text-sm font-medium text-gray-700 mb-1">DNS Servers (comma-separated)</label>
              <input
                type="text"
                id="hotspotDnsServers"
                className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                value={hotspotDnsServers}
                onChange={(e) => setHotspotDnsServers(e.target.value)}
                placeholder="e.g., 8.8.8.8,8.8.4.4"
              />
            </div>
          </div>

          <h3 className="text-xl font-semibold text-purple-700 mb-3">Hotspot Users</h3>
          {hotspotUsers.map((user, index) => (
            <div key={index} className="flex gap-4 mb-3 items-end">
              <div className="flex-1">
                <label htmlFor={`username-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  id={`username-${index}`}
                  className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                  value={user.username}
                  onChange={(e) => handleHotspotUserChange(index, 'username', e.target.value)}
                  placeholder="username"
                />
              </div>
              <div className="flex-1">
                <label htmlFor={`password-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id={`password-${index}`}
                  className="w-full p-3 border border-purple-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                  value={user.password}
                  onChange={(e) => handleHotspotUserChange(index, 'password', e.target.value)}
                  placeholder="password"
                />
              </div>
              {hotspotUsers.length > 1 && (
                <button
                  onClick={() => removeHotspotUser(index)}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition duration-200 flex-shrink-0"
                  title="Remove user"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addHotspotUser}
            className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md shadow-lg transition duration-200 transform hover:scale-105"
          >
            Add Hotspot User
          </button>
        </section>

        {/* Additional IP Pools Configuration */}
        <section className="bg-yellow-50 p-6 rounded-lg shadow-inner border border-yellow-100">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <DatabaseIcon className="w-6 h-6" /> Additional IP Pools
          </h2>
          {additionalIpPools.map((pool) => (
            <div key={pool.id} className="flex flex-col md:flex-row gap-4 mb-3 items-end">
              <div className="flex-1 w-full">
                <label htmlFor={`pool-name-${pool.id}`} className="block text-sm font-medium text-gray-700 mb-1">Pool Name</label>
                <input
                  type="text"
                  id={`pool-name-${pool.id}`}
                  className="w-full p-3 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={pool.name}
                  onChange={(e) => handleAdditionalIpPoolChange(pool.id, 'name', e.target.value)}
                  placeholder="e.g., dhcp-pool"
                />
              </div>
              <div className="flex-1 w-full">
                <label htmlFor={`pool-ranges-${pool.id}`} className="block text-sm font-medium text-gray-700 mb-1">IP Ranges</label>
                <input
                  type="text"
                  id={`pool-ranges-${pool.id}`}
                  className="w-full p-3 border border-yellow-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-200"
                  value={pool.ranges}
                  onChange={(e) => handleAdditionalIpPoolChange(pool.id, 'ranges', e.target.value)}
                  placeholder="e.g., 192.168.1.100-192.168.1.200"
                />
              </div>
              {additionalIpPools.length > 1 && (
                <button
                  onClick={() => removeAdditionalIpPool(pool.id)}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition duration-200 flex-shrink-0 w-full md:w-auto"
                  title="Remove Pool"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addAdditionalIpPool}
            className="mt-4 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-md shadow-lg transition duration-200 transform hover:scale-105"
          >
            Add IP Pool
          </button>
        </section>


        {/* Generated Configuration Output */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-inner border border-gray-100 relative">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            Generated MikroTik CLI Configuration
          </h2>
          <textarea
            readOnly
            className="w-full h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-md border border-gray-700 resize-y focus:outline-none"
            value={generatedConfig}
          ></textarea>
          <button
            onClick={copyToClipboard}
            className="absolute top-6 right-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md transition duration-200 flex items-center gap-2"
            title="Copy to clipboard"
          >
            <CopyIcon className="w-5 h-5" /> Copy
          </button>
          {showNotification && (
            <div className="absolute top-20 right-6 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out">
              Copied to clipboard!
            </div>
          )}
        </section>
      </div>

      {/* Tailwind CSS Animation for notification */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(-10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
