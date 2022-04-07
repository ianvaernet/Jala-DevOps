# Homework

1. Review what are SSH public/private keys
2. Create a personal user in both VMs
3. Setup SSH keys for the personal user
4. Login to the VM with your personal user without using a password
5. Install Jenkins in both VMs using Docker
6. Document the steps

---

## SSH

The Secure Shell (SSH) protocol uses asymetric cryptography, in which a related key pair is used:

- The public key is copied to the SSH server. Anyone with a copy of the public key can encrypt data which can then only be read by the person who holds the corresponding private key.
- The private key remains with the user. The possession of this key is proof of the user's identity. Only a user in possession of a private key that corresponds to the public key at the server will be able to authenticate successfully.

## Create a user

1. Create a new user: `sudo adduser username`
   - In Fedora, configure a password for the user: `sudo passwd username`
2. Add the user to the sudo group:
   - For Ubuntu: `sudo adduser username sudo`
   - For Fedora: `sudo usermod -aG wheel username`
3. Switch to the new user: `su -l username`

## Setup SSH keys

Search the private SSH key in your local machine or create one with `ssh-keygen`.
In the server, logged in with the created user, run:

```
mkdir .ssh
echo 'SSH_PUBLIC_KEY' > .ssh/authorized_keys
```

## Login via SSH

1. In Virtualbox, select the VM, click on Settings -> Network -> Advanced -> Port forwarding and copy the Host port.
2. Connect to the VM via SSH with: `ssh -p HOST_PORT username@127.0.0.1`

## Install Docker

Ubuntu:

```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Fedora:

```
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
```

## Install Jenkins as a Docker container

1. Run:

   ```
   mkdir jenkins_data
   sudo chown -R 1000:1000 jenkins_data
   sudo docker run -p 8080:8080 -p 50000:50000 -v jenkins_data:/var/jenkins_home -d --name jenkins jenkins/jenkins
   ```

2. In Virtualbox, select the VM, click on Settings -> Network -> Advanced -> Port forwarding -> Add and add this rule:
   | Name | Protocol | Host IP | Host Port | Guest IP | Guest Port |
   | ------- | -------- | --------- | --------- | -------- | ---------- |
   | Jenkins | TCP | 127.0.0.1 | 9000 | | 8080 |

3. Run:

   ```
   sudo docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

   Copy that password

4. In your machine (not the VM), open the browser and go to localhost:9000. Paste the password copied in the last step in order to unlock Jenkins.
