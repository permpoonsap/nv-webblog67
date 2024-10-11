<template>
  <div class="container">
    <h1>Create Bag</h1>
    <form @submit.prevent="createBag" class="bag-form">
      <div class="form-group">
        <label for="bagID">BagID:</label>
        <input type="text" v-model="bag.bagID" id="bagID" class="form-control">
      </div>
      <div class="form-group">
        <label for="name">Name (ชื่อกระเป๋า):</label>
        <input type="text" v-model="bag.name" id="name" class="form-control">
      </div>
      <div class="form-group">
        <label for="brand">Brand (ยี่ห้อ):</label>
        <input type="text" v-model="bag.brand" id="brand" class="form-control">
      </div>
      <div class="form-group">
        <label for="category">Category (หมวดหมู่):</label>
        <input type="text" v-model="bag.category" id="category" class="form-control">
      </div>
      <div class="form-group">
        <label for="material">Material (วัสดุ):</label>
        <input type="text" v-model="bag.material" id="material" class="form-control">
      </div>
      <div class="form-group">
        <label for="color">Color (สี):</label>
        <input type="text" v-model="bag.color" id="color" class="form-control">
      </div>
      <div class="form-group">
        <label for="size">Size (ขนาด):</label>
        <input type="text" v-model="bag.size" id="size" class="form-control">
      </div>
      <div class="form-group">
        <label for="price">Price (ราคา):</label>
        <input type="text" v-model="bag.price" id="price" class="form-control">
      </div>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="bag.thumbnail !== 'null'">
          <img :src="BASE_URL + bag.thumbnail" alt="thumbnail">
        </div>
      </transition>

      <div class="form-group">
        <strong>Images:</strong>
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
      </div>

      <div>
        <transition-group tag="ul" class="pictures">
          <li v-for="picture in pictures" v-bind:key="picture.id">
            <img
              style="margin-bottom: 5px"
              :src="BASE_URL + picture.name"
              alt="picture image"
            />
            <br />
            <button v-on:click.prevent="useThumbnail(picture.name)">
              Thumbnail
            </button>
            <button v-on:click.prevent="delFile(picture)">Delete</button>
          </li>
        </transition-group>
        <div class="clearfix"></div>
      </div>

      <button type="submit" class="btn btn-success">Create Bag</button>
    </form>
  </div>
</template>

<script>
import BagsService from '@/services/BagsService';
import VueCkeditor from "vue-ckeditor2";
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
      STATUS_SAVING = 1,
      STATUS_SUCCESS = 2,
      STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "bagPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      bag: {
        bagID: '',
        name: '',
        brand: '',
        category: '',
        material: '',
        color: '',
        size: '',
        price: '',
        thumbnail: 'null',
        pictures: 'null',
        
      },
    };
  },
  methods: {
    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };

        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },
    async createBag() {
      this.bag.pictures = JSON.stringify(this.pictures);
      console.log(this.bag);
      try {
        await BagsService.post(this.bag);
        this.$router.push({ name: 'bags' });
      } catch (err) {
        console.error("Error creating bag:", err);
      }
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
      console.log(filename);
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
  components: {
    VueCkeditor,
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.bag-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.bag-form .form-group {
  margin-bottom: 15px;
}

.bag-form .form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.bag-form .form-group input.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.thumbnail-pic img {
  max-width: 100%;
  height: auto;
  display: block;
  margin-bottom: 15px;
}

.dropbox {
  outline: 2px dashed #ddd;
  outline-offset: -10px;
  background: #f9f9f9;
  color: #333;
  padding: 20px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
  border-radius: 4px;
}

.dropbox:hover {
  background: #f0f0f0;
}

.dropbox .input-file {
  opacity: 0;
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}

.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.pictures li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pictures li img {
  max-width: 180px;
  height: auto;
  border-radius: 4px;
  margin-bottom: 5px;
}

.pictures li .btn {
  margin-top: 5px;
}

.clearfix {
  clear: both;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-success {
  background-color: #28a745;
}
</style>
