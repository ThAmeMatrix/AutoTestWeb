<template>
  <div>
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
    <json-editor v-model="jsonText" placeholder />
  </div>
</template>

<script>
import ExcelUpload from "@/components/excel/ExcelUpload.vue";
import JsonEditor from "@/components/editors/JsonEditor.vue";

export default {
  name: "ExcelUploadComponent",
  components: {
    JsonEditor,
    ExcelUpload
  },
  data() {
    return {
      fileData: {},
      jsonText: {},
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

      console.log(this.fileData.data);
      this.jsonText = JSON.parse(JSON.stringify(this.fileData.data));

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
