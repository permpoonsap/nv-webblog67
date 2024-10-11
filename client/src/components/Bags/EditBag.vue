<template>
  <div class="bag-edit">
    <h1>Edit Bag</h1>
    <form @submit.prevent="editBag" class="bag-form">
      
      <div v-if="pictures.length" class="pictures">
          
            <li v-for="picture in pictures" :key="picture.id" >
              <img :src="BASE_URL + picture.name" alt="Picture" >
            </li>
          
        </div>
      <div class="form-group">
        <label for="bagID">BagID:</label>
        <input type="text" v-model="bag.bagID" id="bagID" class="form-control" disabled>
      </div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="bag.name" id="name" class="form-control">
      </div>
      <div class="form-group">
        <label for="brand">Brand:</label>
        <input type="text" v-model="bag.brand" id="brand" class="form-control">
      </div>
      <div class="form-group">
        <label for="category">Category:</label>
        <input type="text" v-model="bag.category" id="category" class="form-control">
      </div>
      <div class="form-group">
        <label for="material">Material:</label>
        <input type="text" v-model="bag.material" id="material" class="form-control">
      </div>
      <div class="form-group">
        <label for="color">Color:</label>
        <input type="text" v-model="bag.color" id="color" class="form-control">
      </div>
      <div class="form-group">
        <label for="size">Size:</label>
        <input type="text" v-model="bag.size" id="size" class="form-control">
      </div>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="text" v-model="bag.price" id="price" class="form-control">
      </div>

      <transition name="fade">
        <div class="thumbnail-pic" v-if="bag.thumbnail !== 'null'">
          <img :src="BASE_URL + bag.thumbnail" alt="thumbnail">
        </div>
      </transition>

      <div class="form-group">
        <label>Images:</label>
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

      <div class="form-buttons">
        <button type="submit" class="btn btn-success">Update Bag</button>
        <button @click.prevent="navigateTo('/bags')" class="btn btn-secondary">Back</button>
      </div>
    </form>
  </div>
</template>

<script>
import BagsService from '@/services/BagsService';
import UploadService from '@/services/UploadService';

const STATUS_INITIAL = 0,
      STATUS_SAVING = 1,
      STATUS_SUCCESS = 2,
      STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      currentStatus: STATUS_INITIAL,
      uploadFieldName: "bagPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,
      bag: {
        id: '',
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
  async mounted() {
    try {
      const bagId = this.$route.params.bagId;
      const response = await BagsService.show(bagId);
      this.bag = response.data;
      this.pictures = JSON.parse(this.bag.pictures || "[]");
      this.pictureIndex = this.pictures.length;
    } catch (error) {
      console.log("Error loading bag:", error);
    }
  },
  methods: {
    async delFile(picture) {
      if (confirm("Want to delete?")) {
        const dataJSON = { filename: picture.name };

        try {
          await UploadService.delete(dataJSON);
          this.pictures = this.pictures.filter(p => p.id !== picture.id);
        } catch (error) {
          console.error("Error deleting file:", error);
        }
      }
    },
    async editBag() {
      try {
        const formData = {
          name: this.bag.name,
          brand: this.bag.brand,
          category: this.bag.category,
          material: this.bag.material,
          color: this.bag.color,
          size: this.bag.size,
          price: this.bag.price,
          thumbnail: this.bag.thumbnail,
          pictures: JSON.stringify(this.pictures)
        };

        await BagsService.update(this.bag.bagID, formData);
        alert("Bag updated successfully.");
        this.$router.push({ name: 'bags' });
      } catch (err) {
        console.log("Error updating bag:", err);
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
      this.uploadedFileNames = [];
    },
    useThumbnail(filename) {
      this.bag.thumbnail = filename;
    },
    navigateTo(route) {
      this.$router.push(route);
    },
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
  }
};
</script>

<style scoped>
.bag-edit {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f4f6f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.bag-form {
  background: #fff;
  border-radius: 8px;
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
  max-width: 200px;
  margin-bottom: 10px;
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
  position: relative;
}

.pictures img {
  max-width: 100px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.pictures .btn {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8em;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success {
  background-color: #28a745;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
