#!/bin/bash
cd /home/ec2-user/repos/chat
export API_URL=https://chat.arch8.jp
npm install
npm run build

cp ./hooks/chat.service /etc/systemd/system/chat.service
/usr/bin/systemctl enable chat