import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import SocketService from '../socket'
import {count} from '../api'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    connected: false,
    socket: null,
    data: {}
  }),
  actions: {
    connect(token) {
      if (!this.connected) {
        const socket = SocketService.setupSocketConnection(token);
        this.socket = socket;
        this.socket.on("welcome", (data) => {
          console.log("WELCOME");
          this.data = data;
        });
        this.socket.on("raw", (data) => {
          console.log("RAW");
          this.data = data;
        });
        this.socket.on("summary", (data) => {
          console.log("SUMMARY");
          console.log(data);
        });
        this.socket.on("heartbeat", (data) => {
          console.log("HEARTBEAT");
          this.data = data;
        });
        this.socket
        this.connected = true;
      }
    },
    async disconnect() {
      if (this.socket) {
        this.socket.close();
      }
      this.socket = null;
      this.connected = false;
    },
    async command(command, device_id, number) {
      const payload = {
        type: command,
        quantity: number,
        device_id: device_id,
        location_id: this.data.location_id
      };
      console.log(payload);
      await count(payload);

    }
  }
})
