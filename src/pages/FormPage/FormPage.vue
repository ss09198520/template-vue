<template>
    <v-app>
        <v-container>
            <v-row>
                <v-expansion-panels flat accordion value="0" v-model="panel" multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header class="panel-header mb-3">
                            <v-col cols="12">
                                <h2>表單及簽名</h2>
                            </v-col>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-row>
                                <v-col cols="6" class="d-center">
                                    <v-btn depressed color="primary" class="big-btn">
                                        <span class="pt-3">
                                            <v-icon dark size="7vh">
                                                mdi-file-document-outline
                                            </v-icon><br/>
                                            <div class="big-btn-text mt-2">開啟表單</div>
                                        </span>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <div class="sign-preview-area">
                                        <span>簽名預覽</span>
                                        <img v-if="signPreviewImgSrc" style="width: 100%; max-height: 100%" :src="imgSrcPrefix + signPreviewImgSrc" />
                                        <div v-else class="not-scan-area">
                                            <span>尚未簽名</span>
                                        </div>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header class="panel-header mb-3">
                            <v-col cols="12">
                                <h2>新增/刪除 證件</h2>
                            </v-col>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col cols="3" class="mb-2" v-for="(certificate, index) in certificateList" :key="certificate.id">
                                        <v-row>
                                            <v-col cols="12" class="d-center">
                                                <h3 v-if="!certificate.isAdditional">{{ certificate.name }}</h3>
                                                <v-text-field
                                                    v-else
                                                    v-model="certificate.name"
                                                    dense
                                                    hide-details
                                                    class="h3 t-center"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="img-area d-center">
                                                    <img v-if="certificate.imgSrc" style="width: 100%; max-height: 100%" :src="imgSrcPrefix + certificate.imgSrc" />
                                                    <div v-else class="not-scan-area">
                                                        <span>尚未掃描</span>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="d-center">
                                                <v-checkbox 
                                                    class="mt-0" 
                                                    label="本人身分證" 
                                                    color="success" 
                                                    v-model="certificate.isIdCard" 
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" class="t-center">
                                                <v-btn v-if="certificate.isAdditional" depressed color="error" @click="deleteCertificate(index)">
                                                    刪除
                                                    <v-icon
                                                        right
                                                        dark
                                                    >
                                                        mdi-delete
                                                    </v-icon>
                                                </v-btn>
                                                <v-btn v-else depressed color="error" :disabled="!certificate.imgSrc" @click="cleanCertificateImg(certificate)">
                                                    清空
                                                    <v-icon
                                                        right
                                                        dark
                                                    >
                                                        mdi-delete
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" class="t-center">
                                                <v-btn depressed color="primary">
                                                    掃描
                                                    <v-icon
                                                        right
                                                        dark
                                                    >
                                                        mdi-scanner
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="3" class="add-attachment-area">
                                        <v-row class="h-100">
                                            <v-col cols="12" class="h-100 d-center">
                                                <v-btn
                                                class="mx-2"
                                                fab
                                                dark
                                                depressed
                                                color="primary"
                                                @click="addCertificate()"
                                                >
                                                <v-icon dark>
                                                    mdi-plus
                                                </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                        <v-expansion-panel-header class="panel-header mb-3">
                            <v-col cols="12">
                                <h2>新增/刪除 附件</h2>
                            </v-col>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-container>
                                <v-row>
                                    <v-col cols="3" class="mb-2" v-for="(attachment, index) in attachmentList" :key="attachment.id">
                                        <v-row>
                                            <v-col cols="12" style="text-align: center;">
                                                <v-text-field
                                                    v-model="attachment.name"
                                                    dense
                                                    hide-details
                                                    class="h3 t-center"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12">
                                                <div class="img-area d-center">
                                                    <img v-if="attachment.imgSrc" style="width: 100%; max-height: 100%" :src="attachment.imgSrc" />
                                                    <div v-else-if="attachment.file" class="t-center">
                                                        <v-icon x-large class="mb-2">
                                                            mdi-file-document-outline
                                                        </v-icon><br/>
                                                        {{ attachment.file.name }}
                                                    </div>
                                                    <div v-else class="not-scan-area">
                                                        <span>尚未上傳</span>
                                                    </div>
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="12" class="d-center">
                                                <v-checkbox 
                                                    class="mt-0" 
                                                    label="套印專用章" 
                                                    color="success" 
                                                    v-model="attachment.useStamp" 
                                                    hide-details
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" class="t-center">
                                                <v-btn depressed color="error" @click="deleteAttachment(index)">
                                                    刪除
                                                    <v-icon
                                                        right
                                                        dark
                                                    >
                                                        mdi-delete
                                                    </v-icon>
                                                </v-btn>
                                            </v-col>
                                            <v-col cols="6" class="t-center">
                                                <v-btn depressed color="primary" :loading="attachment.isSelecting" @click="uploadFile(attachment, index)">
                                                    上傳
                                                    <v-icon
                                                        right
                                                        dark
                                                    >
                                                        mdi-cloud-upload
                                                    </v-icon>
                                                </v-btn>
                                                <input
                                                    ref="uploaders"
                                                    class="d-none"
                                                    type="file"
                                                    @change="onFileChanged"
                                                >
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="3" class="add-attachment-area">
                                        <v-row class="h-100">
                                            <v-col cols="12" class="h-100 d-center">
                                                <v-btn
                                                class="mx-2"
                                                fab
                                                dark
                                                depressed
                                                color="primary"
                                                @click="addAttachment()"
                                                >
                                                <v-icon dark>
                                                    mdi-plus
                                                </v-icon>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
            <v-row>
                <v-col cols="10"></v-col>
                <v-col cols="2" class="t-center">
                    <v-btn depressed large color="success">
                        <span style="font-size: 18px">儲存</span>
                        <v-icon
                            right
                            dark
                            style="font-size: 24px"
                        >
                            mdi-check
                        </v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script src="./FormPage.js">
</script>

<style scoped>
    .marginLeft {
        margin-left: 100px !important;
    }
    .h-100{
        height: 100%;
    }
    .w-100{
        width: 100%;
    }
    .row + .row{
        margin-top: 0;
    }
    .panel-header{
        border-bottom: 3px solid rgba(0, 0, 0, 0.54);
    }
    .d-center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .t-center{
        text-align: center;
    }
    .t-center >>> input {
      text-align: center
    }
    .h3 >>> input{
        font-size: 1.5625rem !important;
        line-height: 1.4em !important;
        margin-top: 20px;
        margin-bottom: 4px;
    }
    .big-btn{
        height: 20vh !important;
        width: 20vw !important;
    }
    .big-btn-text{
        font-size: 5vh;
    }
    .sign-preview-area{
        width: 60%;
        height: 100%;
        border: 1px solid rgb(207, 207, 207);
        border-radius: 8px;
        text-align: center;
    }
    .img-area {
        height: 30vh;
        width: 100%;
        border: 1px solid rgb(207, 207, 207);
        border-radius: 8px;
    }
    .not-scan-area{
        width: 100%;
        height: 100%;
        background-color: rgba(230, 230, 230, 0.116);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-attachment-area{
        min-height: 30vh;
    }
</style>