$script = <<SCRIPT

#Install node
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs git build-essential

#Install app dependencies
cd /vagrant && npm install && node_modules/bower/bin/bower install

SCRIPT

Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network "forwarded_port", guest: 8080, host: 8080
    config.vm.provision "shell", inline: $script
end
