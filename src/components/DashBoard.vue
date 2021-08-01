<template>
  <v-card>
    <v-data-table
      pa-6
      :headers="headers"
      :items="desserts"
      :items-per-page="10"
      class="elevation-1 pa-6 ma-6"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editEmployee(item)"
          >mdi-pencil</v-icon
        >
        <v-icon small @click="showDeleteDialog(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title>Delete</v-card-title>
        <v-card-text
          >Do you want to delete {{ itemToDelete.name }}?</v-card-text
        >
        <v-card-actions>
          <v-btn color="primary" text @click="dialogDelete = false"
            >Close</v-btn
          >
          <v-btn color="primary" text @click="deleteEmployee(itemToDelete.id)"
            >Delete</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span v-if="editedItem.id">Edit {{ editedItem.name }}</span>
          <span v-else>Create</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="editedItem.phoneNumber"
                label="Phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <!-- <v-text-field v-model="editedItem.department" label="Department"></v-text-field> -->
              <v-select
                v-model="editedItem.department"
                :items="items"
                label="Department"
                data-vv-name="select"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editEmployee()"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="saveItem(editedItem)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Charts :selectedOption="departments" :key="chart_reload" />
  </v-card>
</template>

<script>
import UserService from "../services/emp-data-service";

import Charts from "./Charts";

export default {
  name: "HelloWorld",

  components: {
    Charts,
  },

  data: () => ({
    headers: [
      {
        text: "Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Phone", value: "phoneNumber" },
      { text: "Email", value: "email" },
      { text: "Department", value: "department" },
      { text: "Action", value: "actions", sortable: false },
    ],
    desserts: [],
    departments: [],
    dialog: false,
    dialogDelete: false,
    itemToDelete: {},
    editedItem: {},
    select: null,
    chart_reload: 0,
    items: ["HR", "Admin", "Technical", "Finance"],
  }),

  methods: {
    retrieveUsers() {
      UserService.getAll()
        .then((response) => {
          this.desserts = response?.data;

          //to get department wise data
          const result = this.desserts.reduce(
            (json, val) => ({
              ...json,
              [val.department]: (json[val.department] | 0) + 1,
            }),
            {}
          );

          this.departments[0] = result["HR"] ? result["HR"] : 0;
          this.departments[1] = result["Admin"] ? result["Admin"] : 0;
          this.departments[2] = result["Technical"] ? result["Technical"] : 0;
          this.departments[3] = result["Finance"] ? result["Finance"] : 0;

          this.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveUsers();
    },

    reload() {
      this.chart_reload++;
    },

    editEmployee(item) {
      this.editedItem = item || {};
      this.dialog = !this.dialog;
    },

    saveItem(item) {
      UserService.update(item)
        .then(() => {
          this.editedItem = {};
          this.dialog = !this.dialog;
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    showDeleteDialog(item) {
      this.itemToDelete = item;
      this.dialogDelete = !this.dialogDelete;
    },

    deleteEmployee(id) {
      UserService.delete(id)
        .then(() => {
          this.refreshList();
          this.dialogDelete = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.retrieveUsers();
    }
  },
};
</script>
