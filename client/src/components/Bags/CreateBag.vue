<template>
    <div>
      <h1>Create Bag</h1>
      <form @submit.prevent="createBag">
        <p>BagID: <input type="text" v-model="bag.bagID"></p>
        <p>Name(ชื่อกระเป๋า) : <input type="text" v-model="bag.name"></p>
        <p>Brand(ยี่ห้อ): <input type="text" v-model="bag.brand"></p>
        <p>Category(หมวดหมู่): <input type="text" v-model="bag.category"></p>
        <p>Material(วัสดุ) : <input type="text" v-model="bag.material"></p>
        <p>Color(สี): <input type="text" v-model="bag.color"></p>
        <p>Size(ขนาด): <input type="text" v-model="bag.size"></p>
        <p>Price(ราคา): <input type="text" v-model="bag.price"></p>
  
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
  
        <p><strong>Images:</strong></p>
        <div>
          <ul class="pictures">
            <li v-for="picture in pictures" :key="picture.id">
              <img style="margin-bottom: 5px;" :src="BASE_URL + picture.name" alt="picture image">
              <button v-on:click.prevent="useThumbnail(picture.name)">Thumbnail</button>
              <button v-on:click.prevent="delFile(picture)">Delete</button>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
  
        <p><button type="submit">Create Bag</button></p>
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
        error: null,
        uploadError: null,
        currentStatus: STATUS_INITIAL,
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
    }
  };
  </script>
  
  <style scoped>
  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lemonchiffon;
    color: dimgray;
    padding: 10px;
    min-height: 200px;
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0;
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: khaki;
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
  
  ul.pictures {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }
  
  ul.pictures li {
    margin: 10px;
  }
  
  ul.pictures li img {
    max-width: 180px;
    height: auto;
  }
  
  .clearfix {
    clear: both;
  }
  
  .thumbnail-pic img {
    width: 200px;
  }
  </style>
  