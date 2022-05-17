<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="380"
    >
      <v-card-title>
        <span class="headline">导入歌单</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="url" label="输入歌单链接" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog3 = false">导入</v-btn>
      </v-card-actions>
    </v-card>
    <excel-upload @update-filedata="val => (fileData = val)" />
    <v-data-table
      v-if="fileData && fileData.headers"
      style="margin-top:20px;"
      :headers="tableData.headers"
      :items="tableData.data"
      class="elevation-1"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate />
      <template slot="items" slot-scope="props">
        <td v-for="(col, index) in tableData.headers" :key="index">{{ props.item[col.value] }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ExcelUpload from "@/components/excel/ExcelUpload.vue";

export default {
  name: "ExcelUploadComponent",
  components: {
    ExcelUpload
  },
  data() {
    return {
      url: "",
      fileData: {}
    };
  },
  computed: {
    tableData() {
      if (!this.fileData) {
        return {
          headers: [],
          data: []
        };
      }

      const headers = [];
      const cols = this.fileData.headers || [];
      const rawData = this.fileData.data || [];

      for (let i = 0, len = cols.length; i < len; i += 1) {
        headers.push({
          text: cols[i],
          value: cols[i]
        });
      }

      return { headers, data: rawData };
    }
  }
};
</script>
