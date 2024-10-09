<template>
    <div>
      <h1>Edit Bag</h1>
      <form v-on:submit.prevent="editBag">
        <p>Title: <input type="text" v-model="bag.title"></p>
        <transition name="fade">
          <div class="thumbnail-pic" v-if="bag.thumbnail !== 'null'">
            <img :src="BASE_URL + bag.thumbnail" alt="thumbnail">
          </div>
        </transition>
  
        <div class="dropbox">
          <input 
            type="file" 
            multiple 
            :name="uploadFieldName"
            :disabled="isSaving" 
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*" 
            class="input-file"
          >
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
          <p v-if="isSuccess">
            Upload Successful.
          </p>
        </div>
  
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" :key="picture.id">
            <img style="margin-bottom: 5px;" :src="BASE_URL + picture.name" alt="picture image">
            <button v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
            <button v-on:click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
  
        <p><strong>Description:</strong></p>
        <vue-ckeditor 
          v-model.lazy="bag.description" 
          :config="config" 
          @blur="onBlur($event)" 
          @focus="onFocus($event)"
        />
        <p>Category: <input type="text" v-model="bag.category"></p>
        <p>Status: <input type="text" v-model="bag.status"></p>
        <p>
          <button type="submit">Update Bag</button>
          <button v-on:click="navigateTo('/bags')">Back</button>
        </p>
      </form>
    </div>
  </template>
  
  
  <script>
import BagsService from '@/services/BagsService';
import VueCkeditor from "vue-ckeditor2";
import UploadService from '@/services/UploadService';

const STATUS_INITIAL = 0,
      STATUS_SAVING = 1,
      STATUS_SUCCESS = 2,
      STATUS_FAILED = 3;

export default {
  components: { VueCkeditor },
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: STATUS_INITIAL,
      uploadFieldName: "bagPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      bag: {
        title: '',
        thumbnail: 'null',
        pictures: 'null',
        description: '',
        category: '',
        status: ''
      },
      config: {
        toolbar: [
          ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript']
        ],
        height: 300
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        const dataJSON = {
          filename: material.name
        };

        try {
          await UploadService.delete(dataJSON);
          this.pictures = this.pictures.filter(picture => picture.id !== material.id);
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
    },
    async editBag() {
      try {
        await BagsService.put(this.bag);
        this.$router.push({ name: 'bags' });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(event) {
      console.log('Editor blurred:', event);
    },
    onFocus(event) {
      console.log('Editor focused:', event);
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        this.uploadedFileNames.forEach(uploadFilename => {
          if (!this.pictures.some(picture => picture.name === uploadFilename)) {
            this.pictureIndex++;
            const pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename
            };
            this.pictures.push(pictureJSON);
          }
        });

        this.clearUploadResult();
      } catch (error) {
        console.error("Error uploading files:", error);
        this.currentStatus = STATUS_FAILED;
      }
    },
    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;

      Array.from(fileList).forEach((file) => {
        formData.append(fieldName, file, file.name);
        this.uploadedFileNames.push(file.name);
      });

      this.save(formData);
    },
    clearUploadResult() {
      setTimeout(() => this.reset(), 5000);
    },
    reset() {
      this.currentStatus = STATUS_INITIAL;
      this.uploadError = null;
      this.uploadedFileNames = [];
    },
    useThumbnail(filename) {
      this.bag.thumbnail = filename;
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  async created() {
    try {
      let bagId = this.$route.params.bagId;
      this.bag = (await BagsService.show(bagId)).data;
      this.pictures = JSON.parse(this.bag.pictures);
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

  
  <style scoped>
  /* CSS remains unchanged */
  </style>
  